export interface multipleChoiceQuestion {
  id: string;
  title: string;
  difficulty: number;
  mark: number;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctChoice: string;
}

export interface multipleChoiceForCreateOrUpdateViewModel {
  title: string;
  difficulty: number;
  mark: number;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctChoice: string;
}
