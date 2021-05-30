export default function () {
    return {
        /**
         * ComponentLiaisons will include data (per a namespace) that may be changed in a child component
         * This will be used if the data needs to be emitted multiple times to reach this parent component to eventually change its data
         * We cannot add root-level properties to the Vue State otherwise the getter is not updated properly
         * Therefore we will assign everything to the props property for componentLiaisons
         * See https://stackoverflow.com/a/63222176
         */
        props: {}
    }
}
