using PC_Build_Models;

namespace PC_Build_Service.Interface
{
	public interface IComponentTypeService
	{
		bool AddComponentType(PcComponentType pcComponentType);
		bool EditComponentType(PcComponentType pcComponentType);
		List<PcComponentType>? GetAllComponentTypes();
		bool DeleteComponentType(string id);
	}
}