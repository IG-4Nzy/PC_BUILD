namespace PC_Build_Models
{
	public class PreBuild
	{
		public string? Id { get; set; }
		public string? Name { get; set; }
		public string? Purpose { get; set; }
		public List<PcComponent>? PcComponents { get; set; }
		public string? ExternalLink { get; set; }
		public double Price { get; set; }
	}
}