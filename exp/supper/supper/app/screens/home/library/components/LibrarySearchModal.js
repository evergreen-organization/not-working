import React from 'react';
import { Space } from 'atoms';
import { LibraryListContent } from '../components';
import { BottomModal } from 'molecules';

export const LibrarySearchModal = ({ isVisible, closeModal, loading, books }) => {
	return (
		<BottomModal
			testID={'library-search-modal'}
			isVisible={isVisible}
			fullHeight
			onCancel={closeModal}
		>
			<Space height={30} />
			<LibraryListContent booksVisible={books} loading={loading} />
		</BottomModal>
	);
};
