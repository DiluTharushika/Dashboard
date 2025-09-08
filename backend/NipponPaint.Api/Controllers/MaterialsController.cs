using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NipponPaint.Api.Data;
using NipponPaint.Api.Dtos;
using NipponPaint.Api.Models;

namespace NipponPaint.Api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("materials")]
    public class MaterialsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public MaterialsController(AppDbContext db) => _db = db;

        private int GetUserId()
        {
            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.Parse(idClaim ?? "0");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaterialReadDto>>> GetMaterials()
        {
            var userId = GetUserId();
            var materials = await _db.Materials
                .Where(m => m.UserId == userId)
                .Select(m => new MaterialReadDto { Id = m.Id, Name = m.Name, Code = m.Code, Batch = m.Batch })
                .ToListAsync();

            return Ok(materials);
        }

        [HttpPost]
        public async Task<IActionResult> CreateMaterial([FromBody] MaterialCreateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userId = GetUserId();
            var material = new Material
            {
                UserId = userId,
                Name = dto.Name,
                Code = dto.Code,
                Batch = dto.Batch
            };

            _db.Materials.Add(material);
            await _db.SaveChangesAsync();

            var readDto = new MaterialReadDto { Id = material.Id, Name = material.Name, Code = material.Code, Batch = material.Batch };
            return CreatedAtAction(nameof(GetMaterials), new { id = material.Id }, readDto);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> UpdateMaterial(int id, [FromBody] MaterialUpdateDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userId = GetUserId();
            var material = await _db.Materials.FirstOrDefaultAsync(m => m.Id == id && m.UserId == userId);
            if (material == null) return NotFound(new { message = "Material not found." });

            material.Name = dto.Name;
            material.Code = dto.Code;
            material.Batch = dto.Batch;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> DeleteMaterial(int id)
        {
            var userId = GetUserId();
            var material = await _db.Materials.FirstOrDefaultAsync(m => m.Id == id && m.UserId == userId);
            if (material == null) return NotFound(new { message = "Material not found." });

            _db.Materials.Remove(material);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
