export interface Category {
  id: string,
  name: string,
  description: string
}
export interface Result {
  succeeded: true;
  data: any;
  errors?: string[];
}

