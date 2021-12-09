import * as React from "react";
import { useBem } from "@steroidsjs/core/hooks";
import Icon from "@steroidsjs/core/ui/icon/Icon";
import { IImageFieldViewProps } from "@steroidsjs/core/ui/form/ImageField/ImageField";

export default function ImageFieldView(props: IImageFieldViewProps) {
	const bem = useBem("ImageFieldView");
	const item = props.item;

	return (
		<div className={bem.block()}>
			{!item || !item.image ? (
				<button
					className={bem.element("button", {
						loading: item ? item.progress : false,
					})}
					onClick={props.onClick}
				>
					{!item || !item.progress ? (
						<Icon className={bem.element("button-icon")} name='plus' />
					) : (
						<div className={bem.element("progress-bar")}>
							<div
								className={bem.element("progress-slider")}
								style={{
									width: `${item ? item.progress.percent : 0}%`,
								}}
							/>
						</div>
					)}
					<span className={bem.element("button-label")}>
						{!item || !item.progress ? props.label : "Uploading..."}
					</span>
				</button>
			) : (
				<div className={bem.element("content")}>
					<img
						className={bem.element("image")}
						src={item.image.url}
						width={item.image.width}
						height={item.image.height}
						alt={item.title}
					/>
					<div className={bem.element("image-controls")}>
						<Icon
							className={bem.element("delete-icon")}
							name='trash'
							onClick={item.onRemove}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
