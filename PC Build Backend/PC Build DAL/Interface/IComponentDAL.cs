using PC_Build_Models;

namespace PC_Build_DAL.Interface
{
	public interface IComponentDAL
	{
		ExistCheck IsPcComponetExists(string componentName, string? id);
		Return AddComponent(PcComponent pcComponent);
		List<PcComponent>? GetAllComponentsInType(string typeId);
		Return EditComponent(PcComponent pcComponent);
		Return DeleteComponent(string id);
	}
}