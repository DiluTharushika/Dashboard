using System.ComponentModel.DataAnnotations;

namespace NipponPaint.Api.Dtos
{
    public class MaterialCreateDto
    {
        [Required] public string Name { get; set; } = null!;
        [Required] public string Code { get; set; } = null!;
        [Required] public string Batch { get; set; } = null!;
    }

    public class MaterialUpdateDto
    {
        [Required] public string Name { get; set; } = null!;
        [Required] public string Code { get; set; } = null!;
        [Required] public string Batch { get; set; } = null!;
    }

    public class MaterialReadDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Code { get; set; } = null!;
        public string Batch { get; set; } = null!;
    }
}
