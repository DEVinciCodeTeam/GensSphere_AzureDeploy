package com.gensphere.ProjectoGensphere.storage;

public class StorageFileNotFoundException extends com.gensphere.ProjectoGensphere.storage.StorageException {

    public StorageFileNotFoundException(String message) {
        super(message);
    }

    public StorageFileNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}