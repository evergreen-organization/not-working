import React, { forwardRef, ForwardRefRenderFunction } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useZoomable } from './hooks/useZoomable';
import type { ImageZoomProps, ZoomableRef } from './types';
import useImageLoading from './hooks/useImageLoading';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from 'configs';
import { commonStyles } from 'styles';

const ImageZoom: ForwardRefRenderFunction<ZoomableRef, ImageZoomProps> = (
	{
		uri = '',
		minScale,
		maxScale,
		scale,
		doubleTapScale,
		minPanPointers,
		maxPanPointers,
		isPanEnabled,
		isPinchEnabled,
		isSingleTapEnabled,
		isDoubleTapEnabled,
		onInteractionStart,
		onInteractionEnd,
		onPinchStart,
		onPinchEnd,
		onPanStart,
		onPanEnd,
		onSingleTap,
		onDoubleTap,
		onProgrammaticZoom,
		onResetAnimationEnd,
		onLayout,
		style = {},
		...props
	},
	ref,
) => {
	const { animatedStyle, gestures, onZoomableLayout } = useZoomable({
		minScale,
		maxScale,
		scale,
		doubleTapScale,
		minPanPointers,
		maxPanPointers,
		isPanEnabled,
		isPinchEnabled,
		isSingleTapEnabled,
		isDoubleTapEnabled,
		onInteractionStart,
		onInteractionEnd,
		onPinchStart,
		onPinchEnd,
		onPanStart,
		onPanEnd,
		onSingleTap,
		onDoubleTap,
		onProgrammaticZoom,
		onResetAnimationEnd,
		onLayout,
		ref,
	});
	const { isLoading, onLoadEnd, onLoadStart } = useImageLoading();

	return (
		<>
			<ActivityIndicator
				style={[
					StyleSheet.absoluteFill,
					commonStyles.zIndex1,
					{ display: isLoading ? 'flex' : 'none' },
				]}
				size={'small'}
				color={colors.white}
			/>

			<GestureDetector gesture={gestures}>
				<Animated.Image
					onLoadStart={onLoadStart}
					onLoadEnd={onLoadEnd}
					style={[style, animatedStyle]}
					source={{ uri }}
					resizeMode="contain"
					onLayout={onZoomableLayout}
					{...props}
				/>
			</GestureDetector>
		</>
	);
};

export default forwardRef(ImageZoom);
