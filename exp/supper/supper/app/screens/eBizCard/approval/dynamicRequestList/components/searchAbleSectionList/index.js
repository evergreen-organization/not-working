import { SearchableSectionListComp } from './component';

export const SearchableSectionList = ({
	data,
	searchInput,
	handleSelectAll,
	selectedItems,
	handleSortList,
	handleSelection,
	sortSelected,
	onPressGenerateQRCode,
	setIsApproveVisible,
}) => {
	const keyExtractor = (item, i) => item.id;

	const filteredData = data
		.filter((section) =>
			section.data.some((item) =>
				item.description?.toLowerCase().includes(searchInput.toLowerCase()),
			),
		)
		.map((section) => ({
			...section,
			data: section.data.filter((item) =>
				item.description?.toLowerCase().includes(searchInput.toLowerCase()),
			),
		}));
	const props = {
		data: filteredData,
		handleSelectAll,
		selectedItems,
		handleSortList,
		handleSelection,
		sortSelected,
		onPressGenerateQRCode,
		keyExtractor,
		setIsApproveVisible,
	};
	return <SearchableSectionListComp {...props} />;
};
