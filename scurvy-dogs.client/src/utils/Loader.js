export default class Loader
{
    steps = [];

    load()
    {
        const promiseSteps = this.steps.map(step => step.callback(...step.args));
        this.steps = [];
        return Promise.all(promiseSteps)
    }

    /**
     * 
     * @param {Function} callback the callback function for the loading step
     * @param {Array} args the array of arguments for the callback for the step
     */
    step(callback, args = [])
    {
        this.steps.push({ callback, args });
    }
}