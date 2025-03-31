using PC_Build_DAL.Interface;
using PC_Build_Models;
using PC_Build_Service.Interface;

namespace PC_Build_Service
{
	public class PreBuildService(IPreBuildDAL preBuildDAL) : IPreBuildService
	{
		private readonly IPreBuildDAL preBuildDAL = preBuildDAL;

		public bool AddPreBuild(PreBuild preBuild)
		{
			if (preBuild == null ||
				string.IsNullOrWhiteSpace(preBuild.Name) ||
				string.IsNullOrWhiteSpace(preBuild.Purpose) ||
				preBuild.PcComponents == null ||
				preBuild.PcComponents.Count == 0)
			{
				return false;
			}

			foreach (PcComponent pcComponent in preBuild.PcComponents)
			{
				if (pcComponent == null ||
					string.IsNullOrWhiteSpace(pcComponent.Id))
				{
					return false;
				}
			}

			return preBuildDAL.AddPreBuild(preBuild);
		}

		public List<PreBuild>? GetPreBuild(string purpose)
		{
			List<PreBuild>? preBuilds = preBuildDAL.GetPreBuild(purpose);
			if (null != preBuilds)
			{
				foreach (PreBuild preBuild in preBuilds)
				{
					foreach (PcComponent pcComponent in preBuild.PcComponents)
					{
						preBuild.Price += pcComponent.Price;
					}
				}
			}
			return preBuilds;
		}
	}
}