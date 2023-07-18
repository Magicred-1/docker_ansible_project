#!/bin/bash

# Function to perform the backup
perform_backup() {
  # Get the source code directory of your React web application
  read -p "Enter the source code directory path: " source_dir

  # Check if the provided source directory exists
  if [ ! -d "$source_dir" ]; then
    echo "Error: Source directory does not exist!"
    exit 1
  fi

  # Get the backup folder path
  read -p "Enter the backup folder path: " backup_dir

  # Check if the provided backup directory exists, if not, create it
  if [ ! -d "$backup_dir" ]; then
    mkdir -p "$backup_dir"
  fi

  # Get the date for the backup
  read -p "Enter the backup date (YYYY-MM-DD): " backup_date

  # Validate the date format
  if ! date -d "$backup_date" >/dev/null 2>&1; then
    echo "Error: Invalid date format! Please use YYYY-MM-DD format."
    exit 1
  fi

  # Perform the backup using rsync
  rsync -av --delete "$source_dir/" "$backup_dir/$backup_date/"

  echo "Backup completed successfully!"
}

# Main script starts here
perform_backup
