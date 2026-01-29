import { ToolTipView } from './tooltipView';
import { TooltipContent } from './tooltipContent';
import { TooltipActions } from './tooltipActions';

export const Tooltip = Object.assign(ToolTipView, {
	View: ToolTipView,
	Content: TooltipContent,
	Actions: TooltipActions,
});
