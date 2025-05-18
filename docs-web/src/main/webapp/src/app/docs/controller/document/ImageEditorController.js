'use strict';

/**
 * Image editor controller.
 */
angular.module('docs').controller('ImageEditorController', function ($scope, $stateParams, Restangular, $translate, Notification, $state) {
  console.log('ImageEditorController initialized with fileId:', $stateParams.fileId);
  var cropper;
  
  // Get the file
  Restangular.one('file', $stateParams.fileId).get().then(function(file) {
    console.log('File loaded:', file);
    $scope.imageUrl = '../api/file/' + file.id + '/data';
    console.log('Image URL set to:', $scope.imageUrl);
    
    // Initialize cropper when image is loaded
    var image = document.getElementById('image');
    console.log('Image element:', image);
    
    image.onload = function() {
      console.log('Image loaded, initializing cropper');
      cropper = new Cropper(image, {
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
        
        Restangular.one('file', $stateParams.fileId).post('', {
          data: base64data
        }).then(function() {
          console.log('Image saved successfully');
          Notification.success($translate.instant('document.view.content.image_saved'));
          $state.go('document.view.content');
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
    $state.go('document.view.content');
  };
}); 