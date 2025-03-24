using PC_Build_Models;

namespace PC_Build_DAL.Interface
{
	public interface IComponentTypeDAL
	{
		bool IsPcComponetTypeExists(string typeName, string? id);
		bool AddComponentType(PcComponentType pcComponentType);
		bool EditComponentType(PcComponentType pcComponentType);
		List<PcComponentType>? GetAllComponentTypes();
		bool DeleteComponentType(string id);
	}
}