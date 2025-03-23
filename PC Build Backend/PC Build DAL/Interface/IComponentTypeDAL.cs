using PC_Build_Models;

namespace PC_Build_DAL.Interface
{
	public interface IComponentTypeDAL
	{
		ExistCheck IsPcComponetTypeExists(string typeName, string? id);
		Return AddComponentType(PcComponentType pcComponentType);
		Return EditComponentType(PcComponentType pcComponentType);
		List<PcComponentType>? GetAllComponentTypes();
		Return DeleteComponentType(string id);
	}
}