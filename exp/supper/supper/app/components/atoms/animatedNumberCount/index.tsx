import React, { useEffect, useState, useRef } from 'react';
import { Text } from 'react-native';

type Props = {
	value: number;
	renderContent?: (value: number) => React.ReactNode;
	formatter?: (value: number) => number;
};

const AnimateNumber: React.FC<Props> = ({
	value,
	renderContent = (val) => <Text>{val}</Text>,
	formatter = (val) => val,
}) => {
	const [displayValue, setDisplayValue] = useState<number>(value);
	const startFrom = useRef<number>(value);
	const endWith = useRef<number>(value);
	const animationFrameId = useRef<number | null>(null);

	useEffect(() => {
		startFrom.current = displayValue;
		endWith.current = value;
		animateStep();

		return () => {
			if (animationFrameId.current !== null) {
				cancelAnimationFrame(animationFrameId.current);
			}
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	const animateStep = () => {
		const duration = 500; // Total animation duration in milliseconds
		const interval = 16; // Approximate interval for animation frames (60 FPS)
		const steps = duration / interval;
		const valueChange = (endWith.current - startFrom.current) / steps;

		const step = (startTime: number) => {
			const elapsedTime = Date.now() - startTime;
			const progress = Math.min(elapsedTime / duration, 1);
			const newValue = Math.round(
				startFrom.current + valueChange * (elapsedTime / interval),
			);

			setDisplayValue(newValue);

			if (progress < 1) {
				animationFrameId.current = requestAnimationFrame(() => step(startTime));
			} else {
				setDisplayValue(endWith.current);
			}
		};

		step(Date.now());
	};

	return renderContent(formatter(displayValue));
};

export default AnimateNumber;
