namespace PC_Build_Models
{
    public class PcComponent
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public PcComponentType? Type { get; set; }
        public string? Brand { get; set; }
        public double Price { get; set; }
        public double Rating { get; set; }
        public string? Description { get; set; }
    }
}