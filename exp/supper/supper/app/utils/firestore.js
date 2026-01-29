import firestore from '@react-native-firebase/firestore';

export const firestoreMethod = ({ collection }) => {
	const addOne = async ({ data }) => {
		try {
			const result = await firestore().collection(collection).add(data[0]);
			return firestoreResponseHandler({ result, ok: true });
		} catch (error) {
			return firestoreResponseHandler({ ok: false, error });
		}
	};

	const addMany = async ({ data = [] }) => {
		try {
			data.forEach((item) => {
				firestore().collection(collection).add(item);
			});
			return firestoreResponseHandler({ ok: true });
		} catch (error) {
			return firestoreResponseHandler({ ok: false, error });
		}
	};

	const selectAll = async () => {
		try {
			const result = await firestore().collection(collection).get();
			return firestoreResponseHandler({ result, ok: true });
		} catch (error) {
			return firestoreResponseHandler({ ok: false, error });
		}
	};

	const selectWithFilter = async ({ key, operator = '==', searchParam }) => {
		//get by conditions
		try {
			const result = await firestore()
				.collection(collection)
				.where(key, operator, searchParam)
				.get();

			return firestoreResponseHandler({ result, ok: true });
		} catch (error) {
			return firestoreResponseHandler({ ok: false, error });
		}
	};

	return { addOne, addMany, selectAll, selectWithFilter };
};

const firestoreResponseHandler = ({ result, ok, error }) => {
	if (!ok) {
		return { ok, problem: error };
	}
	let payload = { data: [] };
	let dataArray = [];

	if (!result) {
		payload.data = 'No results';
		payload.ok = ok;
	} else {
		result.forEach((item) => {
			dataArray.push(item.data());
		});
		payload.data = dataArray;
		payload.ok = ok;
	}

	return payload;
};
