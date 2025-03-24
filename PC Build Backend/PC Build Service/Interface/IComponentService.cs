using PC_Build_Models;

namespace PC_Build_Service.Interface
{
	public interface IComponentService
	{
		bool AddComponent(PcComponent pcComponent);
		List<PcComponent>? GetAllComponentsInType(string typeId);
		bool EditComponent(PcComponent pcComponent);
		bool DeleteComponent(string id);
	}
}