namespace PC_Build_Models
{
    public class PcComponet
    {
        public string? Id { get; set; }
        public string Name { get; set; }
        public PcComponentType Type { get; set; }
        public string Brand { get; set; }
        public double Price { get; set; }
        public double Rating { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
    }
}