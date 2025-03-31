using System.Collections.Generic;
using PC_Build_DAL.Interface;
using PC_Build_Models;
using PC_Build_Service.Interface;

namespace PC_Build_Service
{
	public class ComponentService(IComponentDAL componentDAL, IComponentTypeDAL componentTypeDAL) : IComponentService
	{
		private readonly IComponentDAL componentDAL = componentDAL;
		private readonly IComponentTypeDAL componentTypeDAL = componentTypeDAL;

		public bool AddComponent(PcComponent pcComponent)
		{
			if (pcComponent == null ||
				string.IsNullOrEmpty(pcComponent.Name) ||
				string.IsNullOrEmpty(pcComponent.Brand) ||
				string.IsNullOrEmpty(pcComponent.Description) ||
				pcComponent.Type == null ||
				string.IsNullOrEmpty(pcComponent.Type.Id) ||
				pcComponent.Price <= 0 ||
				//pcComponent.Rating <= 0 ||
				pcComponent.Rating > 10)
			{
				return false;
			}

			if (componentDAL.IsPcComponetExists(pcComponent.Name, null))
			{
				return false;
			}
			return componentDAL.AddComponent(pcComponent);
		}

		public List<PcComponent>? GetAllComponentsInType(string typeId)
		{
			return componentDAL.GetAllComponentsInType(typeId);
		}

		public bool EditComponent(PcComponent pcComponent)
		{
			if (pcComponent == null ||
				string.IsNullOrEmpty(pcComponent.Name) ||
				string.IsNullOrEmpty(pcComponent.Brand) ||
				string.IsNullOrEmpty(pcComponent.Description) ||
				pcComponent.Type == null ||
				string.IsNullOrEmpty(pcComponent.Type.Id) ||
				pcComponent.Price <= 0 ||
				//pcComponent.Rating <= 0 ||
				pcComponent.Rating > 10)
			{
				return false;
			}

			if (componentDAL.IsPcComponetExists(pcComponent.Name, pcComponent.Id))
			{
				return false;
			}
			return componentDAL.EditComponent(pcComponent);
		}

		public bool DeleteComponent(string id)
		{
			return componentDAL.DeleteComponent(id);
		}

		public Dictionary<string, List<PcComponent>>? GetAllComponentsWithType()
		{
			List<PcComponentType>? pcComponentTypes = componentTypeDAL.GetAllComponentTypes();

			Dictionary<string, List<PcComponent>> componentsWithType = [];

			if (pcComponentTypes == null)
			{
				return null;
			}

			foreach (PcComponentType pcComponentType in pcComponentTypes)
			{
				List<PcComponent>? pcComponents = componentDAL.GetAllComponentsInType(pcComponentType.Id);
				if (pcComponents == null)
				{
					return null;
				}

				componentsWithType[pcComponentType.Id] = pcComponents;
			}

			return componentsWithType;
		}
	}
}