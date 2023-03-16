import * as components from "./components";

const defaultComponents: any = components?.default;
const stepComponents = {
	install(Vue: any) {
		Object.keys(defaultComponents).forEach((name) => {
			Vue.component(name, defaultComponents[name]);
		});
	},
};
export default stepComponents;

// To support tree shaking, export individual components
export { SButton } from "./components/Button";
