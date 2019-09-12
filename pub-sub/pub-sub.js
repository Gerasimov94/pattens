const eventEmitter = {
	channels: {},
	sub: function(channel, callback){
		if (!this.channels[channel]) {
			this.channels[channel] = [];
		}

		this.channels[channel].push(callback)
	},
	pub: function(channel, data) {
    if (this.channels[channel] && this.channels[channel].length) {
			this.channels[channel].forEach(listener => listener(data))
		}
  }
}

class Human {
	constructor(params) {
		this.params = params;
	}

	showGender() {
		console.log(this.params.gender);
	}

	setJob(job) {
		eventEmitter.pub('job', job)
	}
}

class Job {
	constructor() {
		eventEmitter.sub('job', this.showJob)
	}

	showJob(job) {
		console.log(job);
	}
}

new Job();
const Jessie = new Human({gender: 'female'})
Jessie.setJob('worker')
const Shaun = new Human({gender: 'male'})
Shaun.setJob('driver')