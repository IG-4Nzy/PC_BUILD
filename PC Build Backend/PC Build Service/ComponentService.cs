using PC_Build_DAL.Interface;
using PC_Build_Models;
using PC_Build_Service.Interface;

namespace PC_Build_Service
{
	public class ComponentService(IComponentDAL componentDAL) : IComponentService
	{
		private readonly IComponentDAL componentDAL = componentDAL;

		public Return AddComponent(PcComponent pcComponent)
		{
			pcComponent.Name = pcComponent.Name.Trim();
			pcComponent.Type.Id = pcComponent.Type.Id.Trim();
			pcComponent.Brand = pcComponent.Brand.Trim();
			pcComponent.Description = pcComponent.Description.Trim();

			if (string.IsNullOrEmpty(pcComponent.Name) ||
				string.IsNullOrEmpty(pcComponent.Type.Id) ||
				string.IsNullOrEmpty(pcComponent.Brand) ||
				string.IsNullOrEmpty(pcComponent.Description) ||
				string.IsNullOrWhiteSpace(pcComponent.Image) ||
				pcComponent.Price <= 0 ||
				pcComponent.Rating <= 0 ||
				pcComponent.Rating > 10)
			{
				return Return.BAD_REQUEST;
			}

			ExistCheck existCheck = componentDAL.IsPcComponetExists(pcComponent.Name, null);
			if (ExistCheck.NOT_EXIST != existCheck)
			{
				return ExistCheck.EXISTS == existCheck ? Return.DUPLICATE : Return.DB_ERROR;
			}
			return componentDAL.AddComponent(pcComponent);
		}

		public List<PcComponent>? GetAllComponentsInType(string typeId)
		{
			return componentDAL.GetAllComponentsInType(typeId);
		}

		public Return EditComponent(PcComponent pcComponent)
		{
			pcComponent.Name = pcComponent.Name.Trim();
			pcComponent.Type.Id = pcComponent.Type.Id.Trim();
			pcComponent.Brand = pcComponent.Brand.Trim();
			pcComponent.Description = pcComponent.Description.Trim();

			if (string.IsNullOrEmpty(pcComponent.Name) ||
				string.IsNullOrEmpty(pcComponent.Type.Id) ||
				string.IsNullOrEmpty(pcComponent.Brand) ||
				string.IsNullOrEmpty(pcComponent.Description) ||
				string.IsNullOrWhiteSpace(pcComponent.Image) ||
				pcComponent.Price <= 0 ||
				pcComponent.Rating <= 0 ||
				pcComponent.Rating > 10)
			{
				return Return.BAD_REQUEST;
			}

			ExistCheck existCheck = componentDAL.IsPcComponetExists(pcComponent.Name, pcComponent.Id);
			if (ExistCheck.NOT_EXIST != existCheck)
			{
				return ExistCheck.EXISTS == existCheck ? Return.DUPLICATE : Return.DB_ERROR;
			}
			return componentDAL.EditComponent(pcComponent);
		}

		public Return DeleteComponent(string id)
		{
			return componentDAL.DeleteComponent(id);
		}
	}
}