using PC_Build_Models;

namespace PC_Build_DAL.Interface
{
	public interface IPreBuildDAL
	{
		bool AddPreBuild(PreBuild preBuild);
		List<PreBuild>? GetPreBuild(string purpose);
		bool DeletePreBuild(string preBuildId);
	}
}