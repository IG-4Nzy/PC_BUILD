using PC_Build_Models;

namespace PC_Build_Service.Interface
{
	public interface IPreBuildService
	{
		bool AddPreBuild(PreBuild preBuild);
		List<PreBuild>? GetPreBuild(string purpose);
	}
}