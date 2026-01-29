export interface CardCustomizeSelectionType {
	id: number;
	label: string;
	value: string;
	isBack: boolean;
}

export interface FieldsType {
	key: string;
	label: string;
	isVisible: boolean;
}

export interface CardFieldsType {
	frontFields: FieldsType[];
	backFields: FieldsType[];
}
export interface CardDynamicSelectionType {
	id: number;
	label: string;
	value: string;
	date: string;
}
export interface CustomizeECardFieldPropTypes {
	handleSelection: (selection: FieldsType, index: number) => {} | void;
	handleBackCardPress: () => {} | void;
	selectedItems: FieldsType[];
	showBackCard: boolean;
	selectionFieldsList: FieldsType[];
	handleGoBack: () => {} | void;
}
