using PC_Build_Models;

namespace PC_Build_Service.Interface
{
	public interface IComponentService
	{
		Return AddComponent(PcComponent pcComponent);
		List<PcComponent>? GetAllComponentsInType(string typeId);
		Return EditComponent(PcComponent pcComponent);
		Return DeleteComponent(string id);
	}
}