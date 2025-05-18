'use strict';

/**
 * Image editor controller.
 */
angular.module('docs').controller('ImageEditorController', ['$scope', '$stateParams', 'Restangular', '$translate', 'Notification', '$state', '$timeout', '$rootScope', function($scope, $stateParams, Restangular, $translate, Notification, $state, $timeout, $rootScope) {
  console.log('ImageEditorController initialized with fileId:', $stateParams.fileId);
  var cropper;
  
  // Get the file
  Restangular.one('file/list').get({ id: $stateParams.id }).then(function(data) {
    var file = _.find(data.files, function(f) { return f.id === $stateParams.fileId; });
    if (!file) {
      console.error('File not found');
      Notification.error($translate.instant('document.view.content.file_not_found'));
      return;
    }
    
    console.log('File loaded:', file);
    // Add timestamp to prevent caching
    $scope.imageUrl = '../api/file/' + $stateParams.fileId + '/data?t=' + new Date().getTime();
    console.log('Image URL set to:', $scope.imageUrl);
    
    // Initialize cropper when image is loaded
    var image = document.getElementById('image');
    console.log('Image element:', image);
    
    image.onload = function() {
      console.log('Image loaded, initializing cropper');
      if (typeof window.Cropper === 'undefined') {
        console.error('Cropper is not defined. Make sure cropper.min.js is loaded.');
        Notification.error($translate.instant('document.view.content.cropper_not_loaded'));
        return;
      }
      cropper = new window.Cropper(image, {
        aspectRatio: NaN,
        viewMode: 1,
        dragMode: 'move',
        autoCropArea: 1,
        restore: false,
        guides: true,
        center: true,
        highlight: false,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false
      });
      console.log('Cropper initialized');
    };

    image.onerror = function(error) {
      console.error('Error loading image:', error);
      Notification.error($translate.instant('document.view.content.image_load_error'));
    };
  }, function(error) {
    console.error('Error fetching file:', error);
    Notification.error($translate.instant('document.view.content.file_load_error'));
  });

  $scope.rotate = function(degree) {
    console.log('Rotating image by', degree, 'degrees');
    if (cropper) {
      cropper.rotate(degree);
    }
  };

  $scope.setDragMode = function(mode) {
    console.log('Setting drag mode to:', mode);
    if (cropper) {
      cropper.setDragMode(mode);
    }
  };

  $scope.save = function() {
    console.log('Saving image');
    if (!cropper) {
      console.log('No cropper instance found');
      return;
    }

    var canvas = cropper.getCroppedCanvas();
    console.log('Got cropped canvas');
    
    canvas.toBlob(function(blob) {
      console.log('Canvas converted to blob');
      var reader = new FileReader();
      reader.onloadend = function() {
        var base64data = reader.result.split(',')[1];
        console.log('Blob converted to base64');
        
        Restangular.one('file', $stateParams.fileId).post('data', {
          data: base64data
        }).then(function() {
          console.log('Image saved successfully');
          
          // Clear browser cache for this image
          var img = document.getElementById('image');
          if (img) {
            img.src = '../api/file/' + $stateParams.fileId + '/data?t=' + new Date().getTime();
          }
          
          // Force clear browser cache for all images with this fileId
          var timestamp = new Date().getTime();
          var allImages = document.querySelectorAll('img[src*="' + $stateParams.fileId + '"]');
          allImages.forEach(function(img) {
            img.src = img.src.split('?')[0] + '?t=' + timestamp;
          });
          
          Notification.success($translate.instant('document.view.content.image_saved'));
          
          // Wait a bit to ensure the image is saved before redirecting
          $timeout(function() {
            // Force reload the document view with cache busting
            $state.go('document.view.content', { 
              id: $stateParams.id, 
              t: timestamp,
              forceRefresh: true 
            }, {
              reload: true,
              inherit: false,
              notify: true
            });
            
            // Broadcast an event to force reload the document view content
            $rootScope.$broadcast('document:reload');
          }, 500);
        }, function(error) {
          console.error('Error saving image:', error);
          Notification.error($translate.instant('document.view.content.image_save_error'));
        });
      };
      reader.readAsDataURL(blob);
    });
  };

  $scope.cancel = function() {
    console.log('Canceling image edit');
    $state.go('document.view.content', { id: $stateParams.id });
  };
}]); 