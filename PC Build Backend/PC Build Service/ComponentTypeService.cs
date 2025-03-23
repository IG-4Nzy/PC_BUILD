using PC_Build_DAL.Interface;
using PC_Build_Models;
using PC_Build_Service.Interface;

namespace PC_Build_Service
{
	public class ComponentTypeService(IComponentTypeDAL componentTypeDAL) : IComponentTypeService
	{
		private readonly IComponentTypeDAL componentTypeDAL = componentTypeDAL;

		public Return AddComponentType(PcComponentType pcComponentType)
		{
			pcComponentType.Name = pcComponentType.Name.ToString();
			pcComponentType.Description = pcComponentType.Description.ToString();

			if (string.IsNullOrWhiteSpace(pcComponentType.Name) ||
				string.IsNullOrWhiteSpace(pcComponentType.Description))
			{
				return Return.BAD_REQUEST;
			}

			ExistCheck existCheck = componentTypeDAL.IsPcComponetTypeExists(pcComponentType.Name, null);
			if (ExistCheck.NOT_EXIST != existCheck)
			{
				return ExistCheck.EXISTS == existCheck ? Return.DUPLICATE : Return.DB_ERROR;
			}
			return componentTypeDAL.AddComponentType(pcComponentType);
		}

		public Return EditComponentType(PcComponentType pcComponentType)
		{
			pcComponentType.Id = pcComponentType.Id.ToString();
			pcComponentType.Name = pcComponentType.Name.ToString();
			pcComponentType.Description = pcComponentType.Description.ToString();

			if (string.IsNullOrWhiteSpace(pcComponentType.Id) ||
				string.IsNullOrWhiteSpace(pcComponentType.Name) ||
				string.IsNullOrWhiteSpace(pcComponentType.Description))
			{
				return Return.BAD_REQUEST;
			}

			ExistCheck existCheck = componentTypeDAL.IsPcComponetTypeExists(pcComponentType.Name, pcComponentType.Id);
			if (ExistCheck.NOT_EXIST != existCheck)
			{
				return ExistCheck.EXISTS == existCheck ? Return.DUPLICATE : Return.DB_ERROR;
			}
			return componentTypeDAL.EditComponentType(pcComponentType);
		}

		public List<PcComponentType>? GetAllComponentTypes()
		{
			return componentTypeDAL.GetAllComponentTypes();
		}

		public Return DeleteComponentType(string id)
		{
			return componentTypeDAL.DeleteComponentType(id);
		}
	}
}