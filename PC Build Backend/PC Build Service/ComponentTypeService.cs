using PC_Build_DAL.Interface;
using PC_Build_Models;
using PC_Build_Service.Interface;

namespace PC_Build_Service
{
	public class ComponentTypeService(IComponentTypeDAL componentTypeDAL) : IComponentTypeService
	{
		private readonly IComponentTypeDAL componentTypeDAL = componentTypeDAL;

		public bool AddComponentType(PcComponentType pcComponentType)
		{
			if (pcComponentType == null ||
				string.IsNullOrWhiteSpace(pcComponentType.Name) ||
				string.IsNullOrWhiteSpace(pcComponentType.Description))
			{
				return false;
			}

			if (componentTypeDAL.IsPcComponetTypeExists(pcComponentType.Name, null))
			{
				return false;
			}
			return componentTypeDAL.AddComponentType(pcComponentType);
		}

		public bool EditComponentType(PcComponentType pcComponentType)
		{
			if (pcComponentType == null ||
				string.IsNullOrWhiteSpace(pcComponentType.Id) ||
				string.IsNullOrWhiteSpace(pcComponentType.Name) ||
				string.IsNullOrWhiteSpace(pcComponentType.Description))
			{
				return false;
			}

			if (componentTypeDAL.IsPcComponetTypeExists(pcComponentType.Name, pcComponentType.Id))
			{
				return false;
			}
			return componentTypeDAL.EditComponentType(pcComponentType);
		}

		public List<PcComponentType>? GetAllComponentTypes()
		{
			return componentTypeDAL.GetAllComponentTypes();
		}

		public bool DeleteComponentType(string id)
		{
			return componentTypeDAL.DeleteComponentType(id);
		}
	}
}