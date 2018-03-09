import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Scenario } from './ScenarioObject';
import { AppService } from './app.service';
import { StepResourcesComponent } from './step-resources.component'
import { Observable } from 'rxjs/Rx';


declare var timelineComponents: IDictionary;
@Component({
	selector: 'scenario-details',
	templateUrl: './scenario-details.component.html',
	styleUrls: ['../timeline.scss']
	
})


export class ScenarioDetailsComponent implements OnInit {

	timelineComponents = {};
	timelines: any;
	eventsMinDistance: number;
	scenarioElt: Scenario;
	selectedStep: any;
	left: number;
	idSelectedStep: number;
	timelineTotWidth: number;
	scenarioId: string;
	timelineTranslate: any;
	
	
	constructor(private activatedRoute: ActivatedRoute, private router: Router, private _appService: AppService) {
		this.left = 0;
		this.timelineTotWidth = 0
		this.idSelectedStep = 0
		this.selectedStep = {}
		this.selectedStep.id = 1
		this.scenarioElt = new Scenario()

	}

	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.scenarioId = params['id'];
			console.log(this._appService._scenarioList)
			console.log(this._appService._scenarioTab)
			if(!(this.scenarioId in this._appService._scenarioTab )){
				this._appService.getScenario("SSK_"+this.scenarioId+".xml")
					.subscribe(data => {
						Object.assign(this.scenarioElt , this._appService.createObject(data,"SSK_"+this.scenarioId+".xml"))
						Observable.forkJoin(this._appService.getSteps(this.scenarioElt.stepKeys))
							.subscribe(dataArray => {
								this.scenarioElt.steps = dataArray
								this._appService._scenarioTab[this.scenarioId] = this.scenarioElt
								this.initializeCurrentStep(this.scenarioElt,this.scenarioElt.stepKeys)
							});
					},
					err => console.log(err),
				);
		}
		else{
			this.scenarioElt = this._appService._scenarioTab[this.scenarioId]
			console.log(this.scenarioElt)
			this.initializeCurrentStep(this.scenarioElt)
		}
		});
	}

	initializeCurrentStep(scenario:Scenario, stepsKey? :Array<string>){
	
		this.timelines = $('.cd-horizontal-timeline');
		this.timelineTotWidth = this.timelines.width();
		this.left = this.timelineTotWidth / 7;
		if (this.scenarioElt.steps.length > 5) this.timelineTotWidth = this.timelineTotWidth + this.left * (this.scenarioElt.steps.length - 5);
		(this.timelines.length > 0) && this.initTimeline(this.timelines);
		this.timelineTranslate = 0;
		this.initTimeline(this.timelines)
		if(scenario.steps.length > 0){
			//this.selectedStep.title = scenario.steps[0].head
			this.selectedStep = scenario.steps[0]
			this.selectedStep.ref = scenario.stepKeys[0]

		}
	}

	updateContent(step: any, index: number, event: any) {
		//console.log(this.scenarioElt.stepKeys[index])

		this.idSelectedStep = index;
		this.updateFilling(event.target, this.timelineComponents['fillingLine'], this.timelineTotWidth);
		this.selectedStep = this.scenarioElt.steps[index]
		this.selectedStep['id'] =  index + 1
		this.selectedStep['ref'] = this.scenarioElt.stepKeys[index]
		//console.log(this.selectedStep)
		
	}

	// Timeline Functions
	initTimeline(timelines: any) {
		let _self = this;
		timelines.each(function () {
			var timeline = $(this);
			//cache timeline components 
			_self.timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
			_self.timelineComponents['eventsWrapper'] = _self.timelineComponents['timelineWrapper'].children('.events');
			_self.timelineComponents['fillingLine'] = _self.timelineComponents['eventsWrapper'].children('.filling-line');
			_self.timelineComponents['timelineEvents'] = _self.timelineComponents['eventsWrapper'].find('a');
			_self.timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
			_self.timelineComponents['eventsContent'] = timeline.children('.events-content');

			//keyboard navigation
			$(document).keyup(function (event: any) {
				if (event.which === '37' && _self.elementInViewport(timeline.get(0))) {
					_self.showNewContent(_self.timelineComponents, _self.timelineTotWidth, 'prev');
				} else if (event.which == '39' && _self.elementInViewport(timeline.get(0))) {
					_self.showNewContent(_self.timelineComponents, _self.timelineTotWidth, 'next');
				}
			});
		});
	}

	updateSlide(timelineComponents: any, timelineTotWidth, string) {
		let translateValue = this.getTranslateValue(timelineComponents['eventsWrapper']),
			wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
		(string === 'next')
			? this.translateTimeline(timelineComponents, translateValue - wrapperWidth + this.left, wrapperWidth - timelineTotWidth)
			: this.translateTimeline(timelineComponents, translateValue + wrapperWidth - this.left);
	};

	showNewContent(timelineComponents, timelineTotWidth, string) {
		//go from one event to the next/previous one
		var visibleContent = timelineComponents['eventsContent'].find('.selected'),
			newContent = (string == 'next') ? visibleContent.next() : visibleContent.prev();

		if (newContent.length > 0) { //if there's a next/prev event - show it
			var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
				newEvent = (string == 'next') ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');

			this.updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
			this.updateVisibleContent(newEvent, timelineComponents['eventsContent']);
			newEvent.addClass('selected');
			selectedDate.removeClass('selected');
			this.updateOlderEvents(newEvent);
			this.updateTimelinePosition(string, newEvent, timelineComponents);
		}
	}

	updateTimelinePosition(string, event, timelineComponents) {
		//translate timeline to the left/right according to the position of the selected event
		var eventStyle = window.getComputedStyle(event.get(0), null),
			eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
			timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
			timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
		this.timelineTranslate = this.getTranslateValue(timelineComponents['eventsWrapper']);

		if ((string == 'next' && eventLeft > timelineWidth - this.timelineTranslate) || (string == 'prev' && eventLeft < - this.timelineTranslate)) {
			this.translateTimeline(timelineComponents, - eventLeft + timelineWidth / 2, timelineWidth - timelineTotWidth);
		}
	}

	translateTimeline(timelineComponents: any, value: number, totWidth?: number) {
		var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
		value = (value > 0) ? 0 : value; //only negative translate value
		value = (!(typeof totWidth === 'undefined') && value < totWidth) ? totWidth : value; //do not translate more than timeline width
		this.setTransformValue(eventsWrapper, 'translateX', value + 'px');
		//update navigation arrows visibility
		(value == 0) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
		(value == totWidth) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
	}

	updateFilling(selectedEvent, filling, totWidth) {
		//change .filling-line length according to the selected event
		let eventStyle = window.getComputedStyle(selectedEvent, null);

		let eventLeft = eventStyle.getPropertyValue("left")
		let eventWidth = eventStyle.getPropertyValue("width");
		let eventLef = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', '')) / 2;
		var scaleValue = eventLef / totWidth;
		this.setTransformValue(filling.get(0), 'scaleX', scaleValue);
	}

	setTimelineWidth(timelineComponents, width) {
		var timeSpan = this.daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length - 1]),
			timeSpanNorm = timeSpan / timelineComponents['eventsMinLapse'],
			timeSpanNorm = Math.round(timeSpanNorm) + 4,
			totalWidth = timeSpanNorm * width;
		timelineComponents['eventsWrapper'].css('width', totalWidth + 'px');
		this.updateFilling(timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents['fillingLine'], totalWidth);
		this.updateTimelinePosition('next', timelineComponents['eventsWrapper'].find('a.selected'), timelineComponents);

		return totalWidth;
	}

	updateVisibleContent(event, eventsContent) {
		var eventDate = event.data('date'),
			visibleContent = eventsContent.find('.selected'),
			selectedContent = eventsContent.find('[data-date="' + eventDate + '"]'),
			selectedContentHeight = selectedContent.height();

		if (selectedContent.index() > visibleContent.index()) {
			var classEnetering = 'selected enter-right',
				classLeaving = 'leave-left';
		} else {
			var classEnetering = 'selected enter-left',
				classLeaving = 'leave-right';
		}

		selectedContent.attr('class', classEnetering);
		visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
			visibleContent.removeClass('leave-right leave-left');
			selectedContent.removeClass('enter-left enter-right');
		});
		eventsContent.css('height', selectedContentHeight + 'px');
	}

	updateOlderEvents(event) {
		event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
	}

	getTranslateValue(timeline) {
		let translateValue = 0;
		let timelineStyle = window.getComputedStyle(timeline.get(0), null);
		this.timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
			timelineStyle.getPropertyValue("-moz-transform") ||
			timelineStyle.getPropertyValue("-ms-transform") ||
			timelineStyle.getPropertyValue("-o-transform") ||
			timelineStyle.getPropertyValue("transform");

		if (this.timelineTranslate.indexOf('(') >= 0) {
			let timelineTranslate = this.timelineTranslate.split('(')[1];
			timelineTranslate = timelineTranslate.split(')')[0];
			timelineTranslate = timelineTranslate.split(',');
			translateValue = timelineTranslate[4];
		}

		return Number(translateValue);
	}

	setTransformValue(element, property, value) {
		element.style["-webkit-transform"] = property + "(" + value + ")";
		element.style["-moz-transform"] = property + "(" + value + ")";
		element.style["-ms-transform"] = property + "(" + value + ")";
		element.style["-o-transform"] = property + "(" + value + ")";
		element.style["transform"] = property + "(" + value + ")";
	}

	daydiff(first, second) {
		return Math.round((second - first));
	}



	/*
		How to tell if a DOM element is visible in the current viewport?
		http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	*/
	elementInViewport(el) {
		var top = el.offsetTop;
		var left = el.offsetLeft;
		var width = el.offsetWidth;
		var height = el.offsetHeight;

		while (el.offsetParent) {
			el = el.offsetParent;
			top += el.offsetTop;
			left += el.offsetLeft;
		}

		return (
			top < (window.pageYOffset + window.innerHeight) &&
			left < (window.pageXOffset + window.innerWidth) &&
			(top + height) > window.pageYOffset &&
			(left + width) > window.pageXOffset
		);
	};

	checkMQ() {
		//check if mobile or desktop device
		return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
	}


}


interface IDictionary {
	[key: string]: JQuery<HTMLElement>;
};

