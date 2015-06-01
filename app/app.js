var myApp = angular.module('app', ['ngRoute', 'ui.bootstrap']);
// myApp = angular.module('app', ['ui.bootstrap']);

myApp.controller('MainController', ['$scope', 'cartService', function($scope, cartService) {
	// Begin the app

	// Login / Getting Started
	$scope.user = '1';
	if ($scope.user == '-1')
		$scope.firstTime = true;
	$scope.finishGettingStarted = function(newlistName) {
		$scope.firstTime = false;
		$scope.user = '1';
		$scope.myCustomers.push({
			ID: '4',
			Name: newlistName,
			Creator: 'Brad N',
			CreationDate: '6/12/11 at 12:15pm',
			CountCurrentCustomers: 902,
			Clusters: [ $scope.selectedClusters[1], $scope.selectedClusters[0] ],
			Usage: [],
			UsageRate: 'One-Time',
			ExpiresOn: '',
			RemainingUses: 1
		});
		
	}

	$scope.selectedLocations = [];
	$scope.selectionHandler = function (item, list, parentRows, invert, falseWhileOpen) {
	invert = invert || false;
	item.Selected = (invert) ? item.Selected : !item.Selected;
	item.Selected = (falseWhileOpen) ? false : item.Selected;
	// Check/Uncheck all children
    if (item.hasOwnProperty('SubLocations')) {
		angular.forEach(item.SubLocations, function(i) {
			i.Selected = item.Selected;
            if (i.hasOwnProperty('SubLocations')) {
				angular.forEach(i.SubLocations, function(c) {
					c.Selected = i.Selected;
				});
			}
		});
	}

	// Deselect parent[s] if all children are off
	angular.forEach(parentRows, function(parentRow) {

		if (parentRow.hasOwnProperty('Name')) {
            var result = 0;
			angular.forEach(parentRow.SubLocations, function(i) {
				if ( i.Selected ) {	result++; }
			});
			parentRow.Selected = (result > 0) ? true : false;
        }

	});

	$scope.selectedLocations = [];
	angular.forEach($scope.campaignLocations, function(l) {
		if (l.Selected === true) {  $scope.selectedLocations.push(l.Name);  }
		angular.forEach(l.SubLocations, function(c) {
			if (c.Selected === true) {  $scope.selectedLocations.push(c.Name);  }
			angular.forEach(c.SubLocations, function(r) {
				if (r.Selected === true) {  $scope.selectedLocations.push(r.Name);  }
			});
		});
	});
	// console.log($scope.selectedLocations);

	};

	// Pre-made test models, values

	$scope.campaignLocations = [
		{ 
			ID: '1',
			Name: 'New York',
			type: 'location',
			category: 'state',
			SubLocations: [
				{
					ID: '1_1',
					Name: 'New York City',
					type: 'sublocation',
					category: 'city',
					SubLocations: [
						{	ID: '1_1_1', Name: 'Bronx', category: 'region', },
						{	ID: '1_1_2', Name: 'Brooklyn', category: 'region', },
						{	ID: '1_1_3', Name: 'Manhattan', category: 'region', },
						{	ID: '1_1_4', Name: 'Queens', category: 'region', },
						{	ID: '1_1_5', Name: 'Staten Island', category: 'region', },
					],
				},
				{
					ID: '1_2',
					Name: 'Buffalo',
					type: 'sublocation',
					category: 'city',
				}
			],
		}, 
		{
			ID: '2',
			Name: 'Massachussetts',
			type: 'location',
			category: 'state',
			SubLocations: [
				{
					ID: '2_1',
					Name: 'Boston',
					type: 'sublocation',
					category: 'city',
					SubLocations: [
						{	ID: '2_1_1', Name: 'Boston Metro', category: 'region', },
						{	ID: '2_1_2', Name: 'Brookline', category: 'region', },
						{	ID: '2_1_3', Name: 'Newton', category: 'region', },
						{	ID: '2_1_4', Name: 'Waltham', category: 'region', }
					],
				}
			],
		}
	];

	$scope.selectedClusters = [
		{ 
			ClusterNumber: '29',
			type: 'cluster',
			Name: 'City Mixers',
			Description: 'Mixers are single, ethnically diverse urbanites in their 30s to 50s with no children in the home. They work in a broad wpectrum of white collar jobs.',
			learnMore: 'Rural & Mobile is a group on the go, seemingly without commitment to much of anything. At a mean age of 45, this group is predominantly single renters, with no children at home and little net worth. With mostly high school and vocational/technical degrees, this group indexes above average for blue-collar workers, and nearly twice as many housewives compared to the national average. Interests and media preferences reflect marked gender dichotomies. For instance, popular magazines include Woman\'s World and Country Living, as well as North American Hunter and Guns & Ammo.',
			Percent: 19.4,
			CountCurrentCustomers: 48836,
		},
		{ 
			ClusterNumber: '63',
			type: 'cluster',
			Name: 'Staying Home',
			Description: 'Staying Home is a group of single, downtown-metro renters. This upper-middle-aged, high school and vocational/technical educated group successfully makes ends meet with entry-level clerical and service jobs.',
			learnMore: 'Rural & Mobile is a group on the go, seemingly without commitment to much of anything. At a mean age of 45, this group is predominantly single renters, with no children at home and little net worth. With mostly high school and vocational/technical degrees, this group indexes above average for blue-collar workers, and nearly twice as many housewives compared to the national average. Interests and media preferences reflect marked gender dichotomies. For instance, popular magazines include Woman\'s World and Country Living, as well as North American Hunter and Guns & Ammo.',
			Percent: 10.4,
			CountCurrentCustomers: 7,
		},
		{ 
			ClusterNumber: '69',
			type: 'cluster',
			Name: 'Productive Havens',
			Description: 'Productive Havens contains mid-20s to mid-40s homeowners with lower incomes, yet some net worth. They are single, mostly childless and much more likely to be students than the national average.',
			learnMore: 'Rural & Mobile is a group on the go, seemingly without commitment to much of anything. At a mean age of 45, this group is predominantly single renters, with no children at home and little net worth. With mostly high school and vocational/technical degrees, this group indexes above average for blue-collar workers, and nearly twice as many housewives compared to the national average. Interests and media preferences reflect marked gender dichotomies. For instance, popular magazines include Woman\'s World and Country Living, as well as North American Hunter and Guns & Ammo.',
			Percent: 7.5,
			CountCurrentCustomers: 5,
		},
	];

	$scope.Campaigns = [
		{
			CampaignID: 0,
			Name: "Facebook Mixers",
			Creator: 'Brad N',
			CreationDate: '6/12/11 at 12:15pm',
			MediaChannels: [
				{
					Type: 'Facebook', 
					Status: 'Requested Proposals',
				},
				{
					Type: 'Email', 
					Status: 'Not Started',
				},
			],
			Clusters: [ $scope.selectedClusters[1], $scope.selectedClusters[0] ],
			Audience: 'Current Customers',
			ProspectCount: 0,
			CustomerCount: 981
		},
		{
			CampaignID: 1,
			Name: "Senior Mail",
			Creator: 'John Doe',
			CreationDate: '1/12/14 at 2:15pm',
			MediaChannels: [
				{
					Type: 'Direct Mail', 
					Status: 'Requested Proposals',
				},
			],
			Clusters: [ $scope.selectedClusters[2] ],
			Audience: 'New Customers',
			ProspectCount: 0,
			CustomerCount: 46
		},
	];

	$scope.mediaVendors = [
		{
			VendorID: 1,
			Subtitle: "Marketing Agency",
			Status: "verified",
			Name: "RICG Agency",
			VendorContact: "",
			Description: "We don't do arts and crafts. We create memorable campaigns defined by humanity, beauty and simplicity, while closely harmonizing brand values with consumer needs and preferences. We don't chase answers to problems you've already solved. We connect your brand to highly targeted audiences through an integrated mix of traditional and digital channels, laser-focused on increasing your ROI.\nWe don't stop at the point of execution. We ensure a more rewarding brand journey through personalized programs that transform customers into passionate ambassadors of our client's brands.\nThis app allows you to send campaign lists and select media assets to send to RICG directly.",
			learnMore: 'Rural & Mobile is a group on the go, seemingly without commitment to much of anything. At a mean age of 45, this group is predominantly single renters, with no children at home and little net worth. With mostly high school and vocational/technical degrees, this group indexes above average for blue-collar workers, and nearly twice as many housewives compared to the national average. Interests and media preferences reflect marked gender dichotomies. For instance, popular magazines include Woman\'s World and Country Living, as well as North American Hunter and Guns & Ammo.',
			Ratings: 5,
			Services: ['Direct Mail', 'Social', 'Email', 'Agency Services'],
		},
		{
			VendorID: 2,
			Subtitle: "Mobile Ads - Apple Mobile Network",
			Status: "verified",
			Name: "4 Info",
			VendorContact: "",
			Description: "4INFO is the first mobile platform that combines true, mobile Ad targeting at scale with the ability to track results at the cash register. That means you can finally make LOCAL mobile ads a core component of your integrated media campaigns. Click the button and use the form to request a call with a Mobile Marketing Expert who can use your Locader reports to build a well-planned mobile marketing strategy with you.",
			learnMore: 'Rural & Mobile is a group on the go, seemingly without commitment to much of anything. At a mean age of 45, this group is predominantly single renters, with no children at home and little net worth. With mostly high school and vocational/technical degrees, this group indexes above average for blue-collar workers, and nearly twice as many housewives compared to the national average. Interests and media preferences reflect marked gender dichotomies. For instance, popular magazines include Woman\'s World and Country Living, as well as North American Hunter and Guns & Ammo.',
			Ratings: 3,
			Services: ['Mobile Text', 'Email'],
		},
		{
			VendorID: 3,
			Subtitle: "Facebook Advertising",
			Status: "verified",
			Name: "Segment Specific Facebook Ads",
			VendorContact: "",
			Description: "If you are purchasing new prospect lists using this tool, you can optionally upload that list to your Facebook Advertising account as a new custom audience. This will allow you to create a campaign in your Facebook Advertising account to that list of prospects.\nWhen you get to that step you will need to enter your Facebook Advertiser login. Click button to right to learn more about Facebook Advertising and Custom Audiences and create an account if you don't have one already so you are ready to use this feature.",
			learnMore: 'Rural & Mobile is a group on the go, seemingly without commitment to much of anything. At a mean age of 45, this group is predominantly single renters, with no children at home and little net worth. With mostly high school and vocational/technical degrees, this group indexes above average for blue-collar workers, and nearly twice as many housewives compared to the national average. Interests and media preferences reflect marked gender dichotomies. For instance, popular magazines include Woman\'s World and Country Living, as well as North American Hunter and Guns & Ammo.',
			Ratings: 2.5,
			Services: ['Facebook'],
		},
	];

	$scope.usageRates = [
		{
			UsageID: 1,
			type: 'usage',
			Name: 'Facebook Use',
			pricePerUnit: 0,
			Description: 'Facebook-only usage, no cost. You must have a minimum of 3000 new customers to use this',
			above: 'Automatically included, no additional charge',
			learnMore: 'Rural & Mobile is a group on the go, seemingly without commitment to much of anything. At a mean age of 45, this group is predominantly single renters, with no children at home and little net worth. With mostly high school and vocational/technical degrees, this group indexes above average for blue-collar workers, and nearly twice as many housewives compared to the national average. Interests and media preferences reflect marked gender dichotomies. For instance, popular magazines include Woman\'s World and Country Living, as well as North American Hunter and Guns & Ammo.',
			unique: false
		},
		{
			UsageID: 2,
			type: 'usage',
			Name: 'One Time Use',
			pricePerUnit: 0.05,
			Description: 'Single-time Use, includes Facebook Usage',
			learnMore: 'Rural & Mobile is a group on the go, seemingly without commitment to much of anything. At a mean age of 45, this group is predominantly single renters, with no children at home and little net worth. With mostly high school and vocational/technical degrees, this group indexes above average for blue-collar workers, and nearly twice as many housewives compared to the national average. Interests and media preferences reflect marked gender dichotomies. For instance, popular magazines include Woman\'s World and Country Living, as well as North American Hunter and Guns & Ammo.',
			unique: true
		},
		{
			UsageID: 3,
			type: 'usage',
			Name: 'Two Time Use',
			pricePerUnit: 0.055,
			Description: 'Two-time Use, includes Facebook Usage',
			learnMore: 'Rural & Mobile is a group on the go, seemingly without commitment to much of anything. At a mean age of 45, this group is predominantly single renters, with no children at home and little net worth. With mostly high school and vocational/technical degrees, this group indexes above average for blue-collar workers, and nearly twice as many housewives compared to the national average. Interests and media preferences reflect marked gender dichotomies. For instance, popular magazines include Woman\'s World and Country Living, as well as North American Hunter and Guns & Ammo.',
			unique: true
		},
		{
			UsageID: 4,
			type: 'usage',
			Name: '1-year Unlimited Use',
			pricePerUnit: 0.065,
			Description: 'Unlimited Direct Mail for 1 Year, includes Facebook Usage',
			learnMore: 'Rural & Mobile is a group on the go, seemingly without commitment to much of anything. At a mean age of 45, this group is predominantly single renters, with no children at home and little net worth. With mostly high school and vocational/technical degrees, this group indexes above average for blue-collar workers, and nearly twice as many housewives compared to the national average. Interests and media preferences reflect marked gender dichotomies. For instance, popular magazines include Woman\'s World and Country Living, as well as North American Hunter and Guns & Ammo.',
			unique: true
		},
	];

	$scope.myCustomers = [
		{
			ID: '1',
			type: 'cluster',
			Name: 'Customer List 1',
			Creator: 'Brad N',
			CreationDate: '6/12/11 at 12:15pm',
			CountCurrentCustomers: 902,
			Clusters: [ $scope.selectedClusters[1], $scope.selectedClusters[0] ],
			Usage: [],
			UsageRate: 'One-Time',
			ExpiresOn: '',
			RemainingUses: 1
		},
		{
			ID: '2',
			type: 'cluster',
			Name: 'Customer List B',
			Creator: 'John Doe',
			CreationDate: '1/12/14 at 2:15pm',
			CountCurrentCustomers: 333,
			Clusters: [ $scope.selectedClusters[2] ],
			Usage: [],
			UsageRate: '1-year',
			ExpiresOn: new Date(2016, 4, 15),
			RemainingUses: 0
		},
		{
			ID: '3',
			type: 'cluster',
			Name: 'Seasonal List',
			Creator: 'Kris Kringle',
			CreationDate: '12/24/14 at 2:15pm',
			CountCurrentCustomers: 796,
			Clusters: [ $scope.selectedClusters[0], $scope.selectedClusters[2] ],
			Usage: [],
			UsageRate: '1-year',
			ExpiresOn: new Date(2016, 4, 15),
			RemainingUses: 0
		},
	];

	$scope.availableChannels = [
		{ 
			id: 'direct-mail',
			name: 'Direct Mail',
			type: 'channel'
		},
		{ 
			id: 'email',
			name: 'Email',
			type: 'channel'
		},
		{ 
			id: 'facebook',
			name: 'Facebook',
			type: 'channel'
		},
		{ 
			id: 'mobile-text',
			name: 'Mobile Text',
			type: 'channel'
		}
	];


	var previous;
	$scope.$on('$routeChangeStart', function(next, current) { 
		console.log(previous);
		console.log(current.title);
		previous = current.title;
		$scope.selectedItems = [];
	});

	$scope.cartLists = ['myCustomers', 'selectedClusters', 'usageRates'];

    $scope.selectedItems = [];
    // $scope.selectedLocations = [];
    $scope.updateList = function(item, selected) {
    	if(item) item.Selected = selected;

        $scope.selectedItems = [];
        cartService.clearList();
        angular.forEach($scope.cartLists, function(list) {
            angular.forEach($scope[list], function(item) {
                if (item.Selected === true) {
                    $scope.selectedItems.push(item);

                    // cartService.addItem(item);
                }
            });
        });
        // $scope.selectedItems = cartService.getItems();
        console.log($scope.selectedItems);
    }

    $scope.checkAll = function(list, source, noUpdate) {
    	console.log('checkAll');
        angular.forEach($scope[list], function (item) {
            item.Selected = source;
        });
        if (noUpdate) return false;
        $scope.updateList();
    }
    
    $scope.clearList = function(list) {
    	console.log('clearList');
        if (list == 'all') {
            angular.forEach($scope.cartLists, function(list) {
                angular.forEach($scope[list], function(item) {
                    item.Selected = false;
                });
            });
        } else {
            angular.forEach($scope[list], function (item) {
                item.Selected = false;
            });
        }
        $scope.updateList();
    }

    // $scope.toggle('myToggleableDropdown', 'on');
	$scope.locationPopover = function() {
		var output = '<ul class="list-unstyled">';
		angular.forEach($scope.campaignLocations, function (location) {
			if (location.Selected)	{
				output += '<li>' + location.Name + '</li>';
				if (location.SubLocations.length > 0) {
					angular.forEach(location.SubLocations, function (sublocation) {
						if (sublocation.Selected)
						output += '<li>' + sublocation.Name + '</li>';
					});
				}
			}
		});
		output += '</ul>';
		return output;
	}

}]);


// Services
myApp.factory('cartService', function(){
	var cartItems = [];
	console.log(this);
	this.name = "yo";

	var addItem = function(newItem) {
		cartItems.push(newItem);
	}

	var clearList = function() {
		cartItems = [];
	}

	var getItems = function() {
		return cartItems;
	}

	return {
		addItem: addItem,
		getItems: getItems,
		clearList: clearList
	}
});

// Directives

myApp.directive("sticky", function($window) {
  return {
    link: function(scope, element, attrs) {

      var $win = angular.element($window);

      if (scope._stickyElements === undefined) {
        scope._stickyElements = [];

        $win.bind("scroll.sticky", function(e) {
          var pos = $win.scrollTop();
          for (var i=0; i<scope._stickyElements.length; i++) {

            var item = scope._stickyElements[i];

            if (!item.isStuck && pos > (item.start - attrs.stickyStart)) {
              item.element.addClass("stuck");
              item.isStuck = true;

              if (item.placeholder) {
                item.placeholder = angular.element("<div></div>")
                    .css({height: item.element.outerHeight() + "px"})
                    .insertBefore(item.element);
              }
            }
            else if (item.isStuck && pos < (item.start - attrs.stickyStart)) {
              item.element.removeClass("stuck");
              item.isStuck = false;

              if (item.placeholder) {
                item.placeholder.remove();
                item.placeholder = true;
              }
            }
          }
        });

        var recheckPositions = function() {
          for (var i=0; i<scope._stickyElements.length; i++) {
            var item = scope._stickyElements[i];
            if (!item.isStuck) {
              item.start = item.element.offset().top;
            } else if (item.placeholder) {
              item.start = item.placeholder.offset().top;
            }
          }
        };
        $win.bind("load", recheckPositions);
        $win.bind("resize", recheckPositions);
      }

      var item = {
        element: element,
        isStuck: false,
        placeholder: attrs.usePlaceholder !== undefined,
        start: element.offset().top
      };

      scope._stickyElements.push(item);

    }
  };
});
	// Item Directives
myApp.directive('showCheckbox', function() {
	return {
		restrict: 'A',
		transclude: true,
		scope: { obj: '=' },
		template: '<fieldset class="checkbox row text-left"><label class="col-sm-11"><input id="{{obj.ID}}" data-attribute="{{obj.selectAll}}" type="checkbox"/><label for="{{obj.ID}}" class="check" >{{obj.label}}</label></label></fieldset>',
		// templateUrl: 'app/views/shared/cluster/cluster.html',
		link: function(scope, elements, attrs) {

		}
	}
});

myApp.directive('clusterCheckbox', function() {
	return {
		restrict: 'A',
		transclude: true,
		scope: { obj: '=' },
		template: '<fieldset class="checkbox row text-left"><label class="col-sm-10"><input id="{{obj.ID}}" type="checkbox"/><label for="{{obj.ID}}" class="check" >{{obj.label}}</label></label><div class="col-sm-1"><span data-target="#location{{obj.ID}}" data-toggle="collapse" class="locader-arrowR" ng-if="obj.dropdown"></span></div></fieldset>',
		link: function(scope, elements, attrs) {

		}
	}
});
	
	// Component Directives
	
myApp.directive('showCluster', function() {
	return {
		restrict: 'A',
		transclude: true,
		scope: false,
		// scope: { checkParent: '=' },
		templateUrl: 'app/views/shared/cluster/cluster.html',
		link: function(scope, elements, attrs) {

		}
	}
});


myApp.directive('showVendors', function() {
	return {
		restrict: 'A',
		transclude: true,
		scope: false,
		templateUrl: 'app/views/shared/vendors/vendors.html',
		link: function(scope, elements, attrs) {

		}
	}
});

myApp.directive('showUsage', function() {
	return {
		restrict: 'A',
		transclude: true,
		scope: false,
		templateUrl: 'app/views/shared/usage/usage.html',
		link: function(scope, elements, attrs) {

		}
	}
});

myApp.directive('uploadWizard', function() {
	return {
		restrict: 'A',
		transclude: true,
		scope: false,
		templateUrl: 'app/views/shared/upload/upload.html',
		link: function(scope, elements, attrs) {

		}
	}
});

myApp.directive('chooseLocations', function() {
	return {
		restrict: 'A',
		transclude: true,
		scope: false,
		templateUrl: 'app/views/shared/locations/locations.html',
		link: function(scope, elements, attrs) {

		}
	}
});


	// Page Directives
myApp.directive('showCustomerList', function() {
	return {
		restrict: 'A',
		transclude: true,
		scope: false,
		templateUrl: 'app/views/shared/customerList/customerList.html',
		link: function(scope, elements, attrs) {

		}
	}
});

myApp.directive('showCampaigns', function() {
	return {
		restrict: 'A',
		transclude: true,
		templateUrl: 'app/views/shared/campaignView/campaignView.html',
		link: function(scope, elements, attrs) {

		}
	}
});

myApp.directive('mediaPartner', function() {
	return {
		restrict: 'A',
		transclude: true,
		templateUrl: 'app/views/shared/media-partner/media-partnerView.html',
		link: function(scope, elements, attrs) {
		}
	}
});

myApp.directive('clusterWizard', function() {
	return {
		restrict: 'A',
		transclude: true,
		templateUrl: 'app/views/shared/wizard/wizard.html',
		link: function(scope, elements, attrs) {
		}
	}
});

myApp.directive('showCart', function() {
	return {
		restrict: 'A',
		scope: false,
		// scope: {
			// selectedItems: '&'
		// },
		transclude: true,
		templateUrl: 'app/views/shared/cart/cartView.html',
		link: function(scope, elements, attrs) {
		}
	}
});

myApp.directive('showPaygate', function() {
	return {
		restrict: 'A',
		scope: false,
		transclude: true,
		templateUrl: 'app/views/components/paygate/paygate.html',
		link: function(scope, elements, attrs) {
		}
	}
});

myApp.directive('requestMessage', function() {
	return {
		restrict: 'A',
		scope: false,
		transclude: true,
		templateUrl: 'app/views/shared/requestMessage/requestMessage.html',
		link: function(scope, elements, attrs) {
		}
	}
});

myApp.directive('gettingStarted', function() {
	return {
		restrict: 'A',
		scope: false,
		transclude: true,
		templateUrl: 'app/views/components/gettingStarted/gettingStarted.html',
		link: function(scope, elements, attrs) {
		}
	}
});

myApp.directive('fileDropzone', function() {
  return {
    restrict: 'A',
    scope: {
      file: '=',
      fileName: '=',
      upload: '='
    },
    link: function(scope, element, attrs) {

      var checkSize, isTypeValid, processDragOverOrEnter, validMimeTypes;

      processDragOverOrEnter = function(event) {
      	console.log('dragon!');
        if (event != null) {
          event.preventDefault();
        }
        (event.originalEvent || event).dataTransfer.effectAllowed = 'copy';
        return false;
      };

      validMimeTypes = attrs.fileDropzone;
      checkSize = function(size) {
        var _ref;
        if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
          return true;
        } else {
          alert("File must be smaller than " + attrs.maxFileSize + " MB");
          return false;
        }
      };

      isTypeValid = function(type) {
        if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
          return true;
        } else {
          alert("Invalid file type.  File must be one of following types " + validMimeTypes);
          return false;
        }
      };

      element.bind('dragover', processDragOverOrEnter);
      element.bind('dragenter', processDragOverOrEnter);

      return element.bind('drop', function(event) {
        var file, name, reader, size, type;
        if (event != null) {
          event.preventDefault();
        }
        reader = new FileReader();
        reader.onload = function(evt) {
        	console.log(reader);
        	console.log('read');
          if (checkSize(size) && isTypeValid(type)) {
          	console.log('size and valid');
            return scope.$apply(function() {
            	console.log(scope);
              scope.file = evt.target.result;
              if (angular.isString(scope.fileName)) {
                console.log(reader);
                return scope.fileName = name;
              }
            });
          }
        };
        file = (event.originalEvent || event).dataTransfer.files[0];
        name = file.name;
        type = file.type;
        size = file.size;
        reader.readAsDataURL(file);
        console.log(file);
        
        if (file) {
        	scope.upload = file;
        }
        return false;
      });
    }
  };
});



// Routing
myApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		// .when('/getting-started', {
		// 	title: 'Getting Started',
		// 	controller: 'gettingStartedController',
		// 	templateUrl: 'app/views/components/gettingStarted/gettingStarted.html'
		// })
		.when('/new-campaign', {
			title: 'Create Campaign',
			subtitle: 'Choose how you will reach your target audience',
			controller: 'newCampaignController',
			templateUrl: 'app/views/components/new-campaign/newCampaign.html'
		})
		.when('/new-campaign/:list', {
			title: 'Create Campaign',
			subtitle: 'Choose how you will reach your target audience',
			controller: 'newCampaignController',
			templateUrl: 'app/views/components/new-campaign/newCampaign.html'
		})
		.when('/my-campaigns', {
			title: 'My Campaigns',
			subtitle: 'Manage your current campaigns',
			templateUrl: 'app/views/components/my-campaigns/myCampaigns.html'
		})
		.when('/my-customers', {
			title: 'My Customers',
			subtitle: 'Here is the breakdown of your customer base',
			controller: 'myCustomersController',
			templateUrl: 'app/views/components/my-customers/myCustomers.html'
		})
		.when('/new-customers/:wizardResults', {
			title: 'Find New Customers',
			subtitle: 'Choose customers to target your next campaign',
			controller: 'newCustomersController',
			templateUrl: 'app/views/components/new-customers/newCustomers.html'
		})
		.when('/new-customers', {
			title: 'Find New Customers',
			subtitle: 'Choose customers to target your next campaign',
			controller: 'newCustomersController',
			templateUrl: 'app/views/components/new-customers/newCustomers.html'
		})
		.when('/media-marketplace', {
			title: 'Media Marketplace',
			subtitle: 'Choose customers to target your next campaign',
			controller: 'marketplaceController',
			templateUrl: 'app/views/components/media-partners/mediaMarketplace.html'
		})
		.when('/place-media', {
			title: 'Place Media',
			subtitle: 'Choose Vendors to help you reach your target audience',
			controller: 'marketplaceController',
			templateUrl: 'app/views/components/media-partners/placeMedia.html'
		})
		
		// .when('/', {
		// 	templateUrl: 'app/views/components/new-campaign/newCampaign.html'
		// })
		.otherwise({
			// redirectTo: '/new-campaign',
			redirectTo: '/my-customers',
		});

}]);


// Config
myApp.run(['$rootScope', '$route', function($rootScope, $route) {
    $rootScope.$on('$routeChangeSuccess', function(newVal, oldVal) {
        if (oldVal !== newVal) {
            document.title = $route.current.title;
            $rootScope.pageTitle = $route.current.title;
            $rootScope.pageSubtitle = $route.current.subtitle;
        }
    });
}]);


// controllers

myApp.controller('navController', ['$scope', '$location', function($scope, $location) {
	$scope.isActive = function(viewLocations) {
		for (viewLocation in viewLocations) {
			if (viewLocations[viewLocation] === $location.path())
				return true;
		}
	}

}]);

myApp.controller('newCampaignController', ['$scope', '$modal', '$route', '$routeParams', 'cartService', function($scope, $modal, $route, $routeParams, cartService) {

	$scope.page = $route.current.title;
	$scope.campaignName = '';
	$scope.campaignChannels = [];

	$scope.cartLists = ['selectedClusters', 'myCustomers', 'availableChannels'];
	$scope.selectedItems = cartService.getItems();

	$scope.addCampaign = function() {}

	// $scope.cartLists = ['myCustomers', 'selectedClusters', 'usageRates'];

    $scope.toggleSelection = function toggleSelection(item, o) {
	    var idx = $scope[o].indexOf(item);

	    // is currently selected
	    if (idx > -1) {
	      $scope[o].splice(idx, 1);
	    }

	    // is newly selected
	    else {
	      $scope[o].push(item);
	    }
	};

    $scope.updateList = function(item, selected) {
    	if(item) item.Selected = selected;

    	$scope.selectedItems = [];
        angular.forEach($scope.cartLists, function(list) {
            angular.forEach($scope[list], function(item) {
                if (item.Selected === true) {	$scope.selectedItems.push(item)		}
            });
        });
    }

    $scope.checkAll = function(list, source) {
        angular.forEach($scope[list], function (item) {		item.Selected = source		});
        $scope.updateList();
    }
    
    $scope.clearList = function(list) {
        if (list == 'all') {
            angular.forEach($scope.cartLists, function(list) {
                angular.forEach($scope[list], function(item) {
                    item.Selected = false;
                });
            });
        } else {
            angular.forEach($scope[list], function (item) {
                item.Selected = false;
            });
        }
        $scope.updateList();
    }

	$scope.getTotal = function(list) {
		var total = 0;
		list = list || 'selectedItems';
		for(var i = 0; i < $scope[list].length; i++){
	        total += $scope[list][i].CountCurrentCustomers;
	    }
	    return total;
	}
   
	// Step functions
	if($routeParams.list) {
		$scope.step = 4;
		$scope.progressBar = 2;
	} else {
		$scope.step = 1;
		$scope.progressBar = 1;
	}

	$scope.setStep = function(step, bar, purgeFields) {
		$scope.step = step;
		$scope.progressBar = bar || $scope.progressBar;

		purgeFields = purgeFields || [];
		for(field in purgeFields) {
			$scope[purgeFields[field]] = '';
		}
	}

	$scope.steps = [ 'Select Audience', 'Create Campaign', 'Place Media'];


	$scope.checkAllCustomersLists = function(lists){};
	$scope.updatePeopleInCampaign = function(lists){};

	$scope.open = function ( size, url) {
		url = url || 'app/views/shared/modals/modalCampaignSuccess.html';
	// $scope.open = function ( size, target ) {
	// 	target = target || 'modalCampaignSuccess';
	// 	url = 'app/views/shared/modals/' + target + '.html';
    
    	var modalInstance = $modal.open({
	      templateUrl: url,
	      controller: 'ModalInstanceCtrl',
	      size: size,
	      resolve: {
	        items: function () {
	          return $scope.items;
	        }
	      }
	    });
	};

}]);

myApp.controller('newCustomersController', ['$scope', '$routeParams', '$route', function($scope, $routeParams, $route) {
	
	$scope.page = $route.current.title;
	$scope.selectedItems = [];
	$scope.selectedUsage = [];
	$scope.customerLimit = 0;
	$scope.distance = 0;
	$scope.total = 0;
	$scope.wizardResults = $routeParams.wizardResults
	
	$scope.cartLists = ['myCustomers', 'selectedClusters', 'usageRates'];

    $scope.selectedItems = [];
    $scope.updateList = function(item, selected) {
    	if(item) item.Selected = selected;
        
        $scope.selectedItems = [];
        angular.forEach($scope.cartLists, function(list) {
            angular.forEach($scope[list], function(item) {
                if (item.Selected === true) {	$scope.selectedItems.push(item)		}
            });
        });
    }

    // $scope.checkAll = function(list, source) {
    //     angular.forEach($scope[list], function (item) {		item.Selected = source		});
    //     $scope.updateList();
    // }
    
    // $scope.clearList = function(list) {
    //     if (list == 'all') {
    //         angular.forEach($scope.cartLists, function(list) {
    //             angular.forEach($scope[list], function(item) {
    //                 item.Selected = false;
    //             });
    //         });
    //     } else {
    //         angular.forEach($scope[list], function (item) {
    //             item.Selected = false;
    //         });
    //     }
    //     $scope.updateList();
    // }

    $scope.toggleSelection = function(item, list, value) {
    	item.Selected = !item.Selected;
    	console.log(item.Selected);
    	function addObject(i) {
    		console.log(i);
    		if (i.Selected) return item; else return null;
    	}
    	if (item.UsageID == 1)
	    	$scope.selectedUsage[0] = addObject(item);
    	else {
    		$scope.selectedUsage[1] = item;
	    	 // for(i = 1; i < $scope.usageRates.length; i++) {
	    	 	// if (item.UsageID == i) {
	    	 		// $scope.selectedUsage[1] = item;
	    	 	// }

	    	 	// $scope.usageRates[i].Selected = '';
	    	 // }	
	    	 // $scope.selectedUsage[1] = addObject(item);
    	}
    	console.log($scope.selectedUsage);
    }
   
	$scope.getTotal = function(list) {
		var total = 0;
		list = list || 'selectedItems';
		for(var i = 0; i < $scope[list].length; i++){
	        total += $scope[list][i].CountCurrentCustomers;
	    }
	    if ( $scope.customerLimit > 0) {
	    	$scope.total = ( $scope.customerLimit > total ) ? total : $scope.customerLimit;	
	    } else
		    $scope.total = total;
		
	    return total;
	}

	$scope.getPrice = function() {
		var total = 0;
		for(var i = 0; i < $scope.selectedUsage.length; i++) {
			if ($scope.selectedUsage[i] != null)
			total += $scope.selectedUsage[i].pricePerUnit * $scope.getTotal();
		}
		return total.toFixed(2);
	}

	$scope.steps = [ 'Select Clusters', 'Choose Usage', 'Purchase List' ];

	// Step functions
	if 	($scope.wizardResults) $scope.step = 2;
	else $scope.step = 1;
	$scope.progressBar = 1;
	$scope.setStep = function(step, bar) {
		$scope.step = step;
		$scope.progressBar = bar || $scope.progressBar;
	}


}]);

myApp.controller('myCustomersController', ['$scope', '$route', '$modal', function($scope, $route, $modal) {

	$scope.page = $route.current.title;
	$scope.customerFilter = 'Current Customers';
	$scope.customerViewMethod = 'cluster';
	$scope.selectedItems = [];

	$scope.campaignName = '';
	$scope.campaignChannels = [];

	$scope.cartLists = ['myCustomers', 'selectedClusters', 'availableChannels'];

    $scope.selectedItems = [];
    $scope.updateList = function(item, selected) {
    	if(item) item.Selected = selected;
        
        $scope.selectedItems = [];
        angular.forEach($scope.cartLists, function(list) {
            angular.forEach($scope[list], function(item) {
                if (item.Selected === true) {	$scope.selectedItems.push(item)		}
            });
        });
    }


    $scope.checkAll = function(list, source) {
        angular.forEach($scope[list], function (item) {		item.Selected = source		});
        $scope.updateList();
    }
    
    $scope.clearList = function(list) {
        if (list == 'all') {
            angular.forEach($scope.cartLists, function(list) {
                angular.forEach($scope[list], function(item) {
                    item.Selected = false;
                });
            });
        } else {
            angular.forEach($scope[list], function (item) {
                item.Selected = false;
            });
        }
        $scope.updateList();
    }

	$scope.getTotal = function() {
		var total = 0;
		for(var i = 0; i < $scope.selectedItems.length; i++){
			if ($scope.selectedItems[i].type == 'cluster' || $scope.selectedItems[i] == 'customer-list')
		        total += $scope.selectedItems[i].CountCurrentCustomers;
	    }
	    return total;
	}

	$scope.steps = [ 'Select Audience', 'Create Campaign', 'Place Media' ];

	// Step functions
	$scope.step = 1;
	$scope.progressBar = 1;
	$scope.setStep = function(step, bar) {
		$scope.step = step;
		$scope.progressBar = bar || $scope.progressBar;
	}

	$scope.open = function ( size, url) {
		url = url || 'app/views/shared/modals/modalCampaignSuccess.html';
		var modalInstance = $modal.open({
	      templateUrl: url,
	      controller: 'ModalInstanceCtrl',
	      size: size,
	      resolve: {
	        items: function () {
	          return $scope.items;
	        }
	      }
	    });
	};

}]);

myApp.controller('marketplaceController', ['$scope', '$routeParams', function($scope, $routeParams) {
	
	$scope.marketplaceFilter;
	$scope.rate = 7;
	$scope.max = 5;
	$scope.isReadonly = false;
	$scope.vendorState = '';
	$selectedCampaign = '';

	if($routeParams.newCampaign == true) {
		$('#successModal').modal();
	}

	$scope.hoveringOver = function(value) {
		$scope.overStar = value;
		$scope.percent = 100 * (value / $scope.max);
	};

	$scope.selectedVendors = [];
	$scope.updateList = function(item, parent) {
		if(item) item.Selected = parent;

	    $scope.selectedVendors = [];
        angular.forEach($scope.mediaVendors, function(item) {

            if (item.Selected === true) {
                $scope.selectedVendors.push(item);
            }
        });
	}

	$scope.checkAll = function(list, source, noUpdate) {
	    angular.forEach($scope[list], function (item) {
	        item.Selected = source;
	    });
	    if (noUpdate) return false;
	    $scope.updateList();
	}

	$scope.getCamp = function() {
		console.log('getCamp');
		console.log($scope.selectedCampaign);
	}

	$scope.message = [
		{
			state: "invite",
			copy: "Invite Message",
		},
		{
			state: "getInfo",
			copy: "Get More Info",
		},
		{
			state: "proposal",
			copy: "Dear Media Partner, Recently we have been doing a bit of customer demographic, geographic and life-stage research on our client base. As a result we now have a much better idea of how we might be able to work with you in order to better target our marketing and advertising communications. I'd like to share this report with you!",
		},
	]

}]);

myApp.controller('gettingStartedController', ['$scope', function($scope) {

	$scope.steps = [ 'Select Files', 'Name List', 'Match Headers' ];
	$scope.gettingStarted = true;
	$scope.username = 'Test';
console.log('gs controller');
	// Step functions
	$scope.step = 1;
	$scope.progressBar = 1;
	$scope.setStep = function(step, bar) {
		$scope.step = step;
		$scope.progressBar = bar || $scope.progressBar;
	}

	$scope.logIn = function(address) {
		$scope.user = address;
		$scope.setStep(2);
	}

    $scope.selectedItems = [];
    // $scope.selectedLocations = [];
    // $scope.updateList = function(item, selected) {
    // 	if(item) item.Selected = selected;

    //     $scope.selectedLocations = [];
    //     angular.forEach($scope.selectedItems, function(list) {
    //         angular.forEach($scope[list], function(item) {
    //             if (item.Selected === true) {
    //                 $scope.selectedLocations.push(item);
    //             }
    //         });
    //     });
    //     console.log($scope.selectedLocations);
    // }

    $scope.checkAll = function(list, source, noUpdate) {
    	console.log('checkAll');
        angular.forEach($scope[list], function (item) {
            item.Selected = source;
        });
        if (noUpdate) return false;
        $scope.updateList();
    }

}]);

myApp.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {

  $scope.selected = {
    // item: $scope.items[0]
  };

  $scope.close = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
	
}]);
	
myApp.controller('uploadController', ['$scope', function ($scope) {
	console.log('uploader');
	$scope.step = 1;
	$scope.setStep = function(step, bar) {
		console.log(step);
		$scope.step = step;
		$scope.progressBar = bar || $scope.progressBar;
	}

}]);