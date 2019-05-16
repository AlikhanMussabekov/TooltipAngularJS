angular.module('ui.bootstrap.tooltip', [] )
	.directive( 'tooltipPopup', function () {
		return {
			restrict: 'E',
			replace: true,
			templateUrl: 'tooltip-popup.html'
		};
	})

	.directive('tooltip', function ( $compile, $timeout, $http ) {

		var template =
			'<tooltip-popup></tooltip-popup>';

		return {
			scope: {
				tooltipTitle: '@tooltip',
				placement: '@tooltipPlacement',
				animation: '@tooltipAnimation',
				tooltipDelay: '@tooltipDelay' ,
				birthdate: '@userBirthdate',
				userId: '@userId',
				additionalInfo: '@',
				methodName: '@'
			},
			link: function ( scope, element ) {

				var tooltip = $compile( template )( scope ),
					transitionTimeout;
				var timer;

				scope.isLoading = true;
				scope.tooltipDelay = scope.tooltipDelay || 1000;
				
				function getPosition() {
					return {
						width: element.prop( 'offsetWidth' ),
						height: element.prop( 'offsetHeight' ),
						top: element.prop( 'offsetTop' ),
						left: element.prop( 'offsetLeft' )
					};
				}

				function fetchData() {

					$http({
						url: 'http://localhost:8080/' + scope.methodName,
						method: "GET",
						withCredentials: true,
						headers: {
							'Content-Type': 'application/json; charset=utf-8'
						},
						params: {
							id: scope.userId
						}
					}).then(function successCallBack(response) {
						scope.isLoading = false;
						scope.userServerData = response.data;
					}, function errorCallBack(response){
						console.log(response);
					});

				}

				// Show the tooltip popup element.
				function show() {

					var position,
						ttWidth,
						ttHeight,
						ttPosition;

					scope.placement = scope.placement || 'top';

					if ( transitionTimeout ) $timeout.cancel( transitionTimeout );

					tooltip = tooltip ||  $compile( template )( scope );

					tooltip.css({ top: 0, left: 0, display: 'block' });

					element.after( tooltip );

					position = getPosition();

					ttWidth = tooltip.prop( 'offsetWidth' );
					ttHeight = tooltip.prop( 'offsetHeight' );
					if (scope.additionalInfo) {
						fetchData();
					}

					switch ( scope.placement ) {
						case 'right':
							ttPosition = {
								top: (position.top + position.height / 2 - ttHeight / 2) + 'px',
								left: (position.left + position.width) + 'px'
							};
							break;
						case 'bottom':
							ttPosition = {
								top: (position.top + position.height) + 'px',
								left: (position.left + position.width / 2 - ttWidth / 2) + 'px'
							};
							break;
						case 'left':
							ttPosition = {
								top: (position.top + position.height / 2 - ttHeight / 2) + 'px',
								left: (position.left - ttWidth) + 'px'
							};
							break;
						default:
							ttPosition = {
								top: (position.top - ttHeight) + 'px',
								left: (position.left + position.width / 2 - ttWidth / 2) + 'px'
							};
							break;
					}

					tooltip.css( ttPosition );

					scope.isOpen = true;
				}

				function hide() {

					tooltip.removeClass( 'in' );
					scope.isOpen = false;

					if ( angular.isDefined( scope.animation ) && scope.animation() ) {
						transitionTimeout = $timeout( function () {
							tooltip.remove();
						}, 500 );
					} else {
						tooltip.remove();
					}
				}

				// Register the event listeners.
				element.bind( 'mouseenter', function() {

					timer = $timeout(function () {
						scope.$apply( show );
					}, scope.tooltipDelay);


				});
				element.bind( 'mouseleave', function() {
					$timeout.cancel(timer);
					scope.$apply( hide );
				});
			}
		};
	});