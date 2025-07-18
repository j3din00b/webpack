"use strict";

const mimeTypes = require("mime-types");
const svgToMiniDataURI = require("mini-svg-data-uri");

/** @type {import("../../../../").Configuration} */
module.exports = {
	mode: "development",
	module: {
		parser: {
			asset: {
				dataUrlCondition: (source, { filename }) => filename.includes("?inline")
			}
		},
		generator: {
			asset: {
				dataUrl: (source, { module }) => {
					const mimeType = mimeTypes.lookup(
						/** @type {string} */
						(module.nameForCondition())
					);
					if (mimeType === "image/svg+xml") {
						if (typeof source !== "string") {
							source = source.toString();
						}

						return svgToMiniDataURI(source);
					}

					const encodedContent = source.toString("base64");

					return `DATA:${mimeType};base64,${encodedContent}`;
				}
			}
		},
		rules: [
			{
				test: /\.(png|svg)$/,
				type: "asset"
			},
			{
				test: /\.jpg$/,
				type: "asset/inline"
			}
		]
	}
};
