using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

var builder = WebApplication.CreateBuilder(args);

// מושך את ה?ConnectionString מה?ENV של Render או מ?appsettings.json
var connectionString = Environment.GetEnvironmentVariable("ToDoDB")
                       ?? builder.Configuration.GetConnectionString("ToDoDB");

// מוסיפים DbContext עם MySQL
builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));

// Swagger (נוח לבדיקה)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS - מאפשר ל?React App להגיע ל?API
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.WithOrigins("https://todolist-fullstack2.onrender.com") // כתובת ה?React שלך
              .AllowAnyHeader()
              .AllowAnyMethod()
    );
});

var app = builder.Build();

// בדיקה אסינכרונית של חיבור למסד הנתונים בזמן Startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ToDoDbContext>();
    try
    {
        if (await db.Database.CanConnectAsync())
            Console.WriteLine("? Connected to DB successfully!");
        else
            Console.WriteLine("? Could not connect to DB.");
    }
    catch (Exception ex)
    {
        Console.WriteLine("? Failed to connect to DB:");
        Console.WriteLine(ex.Message);
        if (ex.InnerException != null)
            Console.WriteLine("Inner Exception: " + ex.InnerException.Message);
        Console.WriteLine(ex.StackTrace);
    }
}

// פורט ל?Render
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
app.Urls.Add($"http://*:{port}");

// Middleware
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors(); // חייב לבוא לפני ה?Endpoints

// Endpoints
app.MapGet("/tasks", async (ToDoDbContext db) => await db.Items.ToListAsync());

app.MapGet("/tasks/{id}", async (int id, ToDoDbContext db) =>
    await db.Items.FindAsync(id) is Item item ? Results.Ok(item) : Results.NotFound());

app.MapPost("/tasks", async (Item item, ToDoDbContext db) =>
{
    try
    {
        db.Items.Add(item);
        await db.SaveChangesAsync();
        return Results.Created($"/tasks/{item.Id}", item);
    }
    catch (DbUpdateException ex)
    {
        Console.WriteLine("Error saving entity:");
        Console.WriteLine(ex.Message);
        if (ex.InnerException != null)
            Console.WriteLine("Inner Exception: " + ex.InnerException.Message);
        return Results.Problem("Failed to save task.");
    }
});

app.MapPut("/tasks/{id}", async (int id, Item updatedItem, ToDoDbContext db) =>
{
    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();

    item.Name = updatedItem.Name;
    item.IsComplete = updatedItem.IsComplete;

    try
    {
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    catch (DbUpdateException ex)
    {
        Console.WriteLine("Error updating entity:");
        Console.WriteLine(ex.Message);
        if (ex.InnerException != null)
            Console.WriteLine("Inner Exception: " + ex.InnerException.Message);
        return Results.Problem("Failed to update task.");
    }
});

app.MapDelete("/tasks/{id}", async (int id, ToDoDbContext db) =>
{
    var item = await db.Items.FindAsync(id);
    if (item is null) return Results.NotFound();

    db.Items.Remove(item);

    try
    {
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    catch (DbUpdateException ex)
    {
        Console.WriteLine("Error deleting entity:");
        Console.WriteLine(ex.Message);
        if (ex.InnerException != null)
            Console.WriteLine("Inner Exception: " + ex.InnerException.Message);
        return Results.Problem("Failed to delete task.");
    }
});

app.MapGet("/", () => "ToDo API is running");

app.Run();
