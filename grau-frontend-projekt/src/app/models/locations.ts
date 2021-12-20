export interface Locations {
  $schema: string
  type: Array<any>
  items: Items
}

export interface Items {
  type: any
  properties: Properties
}

export interface Properties {
  id: Id
  name: Name
  city: City
  statistics: Statistics
}

export interface Id {
  type: number
  description: string
}

export interface Name {
  type: string
  description: string
}

export interface City {
  type: string
  description: string
}

export interface Statistics {
  type: any
  properties: Properties2
}

export interface Properties2 {
  today_count: TodayCount
}

export interface TodayCount {
  type: number
}

