using PC_Build_Models;

namespace PC_Build_Service.Interface
{
	public interface IPreBuildService
	{
		bool AddPreBuild(PreBuild preBuild);
	}
}