

export class Scenario {
    id: String
    name: String
    title: any
    shortTitle: any
    desc: any
    shortDesc: any
    steps: Array<any>
    head: any
    urlImage: string
    stepKeys: Array<string>
    constructor() {
         this.steps = [];
         this.desc = {}
         this.title = {}
         this.head = {}
         this.stepKeys = [];
    }

    public getSteps() {
        return this.steps
    }
}
