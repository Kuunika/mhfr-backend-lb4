interface Resource {
  id?: number,
  resource_name: string,
  description?: string,
  resource_type_id: number
}

export interface FormattedResource {
  id?: number,
  name: string,
  resources: Array<Resource>
}
