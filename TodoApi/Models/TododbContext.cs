using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models
{
    public partial class ToDoDbContext : DbContext
    {
        public DbSet<Item> Items { get; set; }
        public DbSet<User> Users { get; set; }

        public ToDoDbContext() { }

        public ToDoDbContext(DbContextOptions<ToDoDbContext> options)
            : base(options) { }

        // הסרנו את החיבור הקבוע ל־localhost
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // הכל נעשה דרך Program.cs
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("Items");
                entity.Property(e => e.Name).HasMaxLength(100);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.ToTable("Users");
                entity.Property(e => e.Username).HasMaxLength(50);
                entity.Property(e => e.Password).HasMaxLength(100);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
