using PC_Build_Models;

namespace PC_Build_DAL.Interface
{
	public interface IComponentDAL
	{
		bool IsPcComponetExists(string componentName, string? id);
		bool AddComponent(PcComponent pcComponent);
		List<PcComponent>? GetAllComponentsInType(string typeId);
		bool EditComponent(PcComponent pcComponent);
		bool DeleteComponent(string id);
	}
}