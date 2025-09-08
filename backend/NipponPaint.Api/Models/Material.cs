namespace NipponPaint.Api.Models
{
    public class Material
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public string Name { get; set; } = null!;
        public string Code { get; set; } = null!;
        public string Batch { get; set; } = null!;

        public User? User { get; set; }
    }
}
