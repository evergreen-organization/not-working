#!/bin/bash




js_file="/Users/administrator/Documents/Documents/rnmobile.js"
source_dir="/Users/administrator/Documents/Documents/ent"  
destination_dir="/Users/administrator/Documents/Documents/nameTest"  

title_matched=false
system_matched=false
android_block=false
ios_block=false
esec_low=false
esec=false
esec_full=false


# Empty the destination directory
cd "$destination_dir" || exit
rm -rf *
echo "Destination directory is empty!"


if [ ! -d "$source_dir" ]; then
  echo "Source directory does not exist!"
  exit 1
fi

# Check if destination directory exists
if [ ! -d "$destination_dir" ]; then
  echo "Destination directory does not exist!"
  exit 1
fi

# Prompt for deployment type selection
echo "Select a Deployment Type:"
echo "1) UAT"
echo "2) ESEC"
read -p "Enter your choice (1-2): " selection

case $selection in
  1) dep_type="UAT" ;;
  2) dep_type="ESEC" ;;
  *) echo "Invalid choice!" && exit 1 ;;
esac

# Prompt for file naming convention selection
echo "Select a naming Convention for the files:"
echo "1) pbExperience"
echo "2) pbEnterprise"
echo "3) PBJourney"
echo "4) MyPBLaos"
echo "5) MyPB"
read -p "Enter your choice (1-5): " choice

case $choice in
  1) prefix="pbExperience" ;;
  2) prefix="pbEnterprise" ;;
  3) prefix="PBJourney" ;;
  4) prefix="MyPBLaos" ;;
  5) prefix="MyPB" ;;
  *) echo "Invalid choice!" && exit 1 ;;
esac

case $choice in 
  1) provided_title="PBeXperience" ;;
  2) provided_title="PB Enterprise" ;;
  3) provided_title="PB Journey" ;;
  4) provided_title="MyPB Laos" ;;
  5) provided_title="MyPB" ;;
  *) echo "Invalid choice!" && exit 1 ;;
esac
if [ "$dep_type" = "UAT" ]; then 

  case $choice in 
    1) provided_system="PBeXperience-UAT" ;;
    2) provided_system="PBEnterprise - UAT" ;;
    3) provided_system="PB Journey" ;;
    4) provided_system="MyPB Laos" ;;
    5) provided_system="MyPB" ;;
    *) echo "Invalid choice!" && exit 1 ;;
  esac
else
  esec_low=true
  esec=true
  esec_full=true
  case $choice in 
    1) provided_system="PBeXperience-eSec-low" ;;
    2) provided_system="PBEnterprise eSec-low" ;;
    3) provided_system="PB Journey" ;;
    4) provided_system="MyPB Laos" ;;
    5) provided_system="MyPB" ;;
    *) echo "Invalid choice!" && exit 1 ;;
  esac
fi

read -p "Enter Deployment date: " new_date
read -p "Enter Build Version: " version
read -p "Enter description: " new_description
# Temp file to store the updated JS file


temp_file=$(mktemp)


while IFS= read -r line; do
  # Check if the line contains "title"
  if [[ "$line" == *title* ]]; then
    
    title_value=$(echo "$line" | cut -d':' -f2 | sed 's/[", ]//g')
    echo "Extracted title: $title_value"
    if [[ "$title_value" == "$provided_title" ]]; then
      title_matched=true
    fi
  fi

  if $title_matched; then
    # Check for system match
    if [[ "$line" == *system* ]]; then
      system_value=$(echo "$line" | cut -d':' -f2 | sed 's/[", ]//g')
      if [[ "$system_value" == "$provided_system" ]]; then
        system_matched=true
      fi
    fi
    
    if $system_matched; then
      # Handle update of date and versions
      if [[ "$line" == *updateDate* ]]; then
        line="      updateDate: \"$new_date\","
      fi

      if [[ "$line" == *androidVersion* ]]; then
        line="      androidVersion: \"$version\","
      fi

      if [[ "$line" == *iosVersion* ]]; then
        line="      iosVersion: \"$version\","
      fi

      # Detect start of android or ios block
      if [[ "$line" == *android:* ]]; then
        android_block=true
      elif [[ "$line" == *ios:* ]]; then
        ios_block=true
      fi

      # Skip description update inside android and ios
      if $android_block || $ios_block; then
        if [[ "$line" == *description* ]]; then
          echo "$line" >> "$temp_file"
          continue  # Skip updating the description inside android or ios
        fi
      fi

      # Detect end of android or ios block (assuming it's closed by a brace)
      if [[ "$line" == *"}"* ]]; then
        android_block=false
        ios_block=false
      fi

      # Update description for other sections (not in android or ios)
      if ! $android_block && ! $ios_block; then
        if [[ "$line" == *description* ]]; then
          if [ "$dep_type" = "UAT" ]; then
            line="      description: [\"For UAT - $new_description\"],"
          elif [ "$esec_low" = true ]; then
            line="      description: [\"For low rooting security config - $new_description\"],"
            esec_low=false
          elif [ "$esec" = true ]; then
            line="      description: [\"For full security config - $new_description\"],"
            esec=false
          elif [ "$esec_full" = true ]; then
            line="      description: [\"For full security config - $new_description\"],"
            esec_full=false
          fi
        fi
      fi
    fi
  fi

  # Write the updated (or original) line to the temp file
  echo "$line" >> "$temp_file"

done < "$js_file"

# Replace the original file with the updated content
mv "$temp_file" "$js_file"

echo "JavaScript file updated successfully."

echo "Processing files..."

if [ "$dep_type" = "UAT" ]; then
  find "$source_dir" -type d -name "full-signed" | while read -r dir_path; do
    cd "$dir_path" || continue
    7z x "*.zip"

    unzipped_content=$(find "$dir_path" -maxdepth 1 -type f -name "*.ipa" -o -name "*.apk")
    file_name=$(basename "$unzipped_content")
    extension="${file_name##*.}"
    new_name="${prefix}_${dep_type}"
    
    mv "$unzipped_content" "$destination_dir/$new_name.$extension"
  done
  echo "All files have been unzipped, renamed, and copied successfully!"
else
  find "$source_dir" -type d -name "full-signed" | while read -r dir_path; do
    cd "$dir_path" || continue
    7z x "*.zip"

    unzipped_content=$(find "$dir_path" -maxdepth 1 -type f -name "*.ipa" -o -name "*.apk")
    file_name=$(basename "$unzipped_content")
    extension="${file_name##*.}"
    new_name="${prefix}_RASP"
    
    mv "$unzipped_content" "$destination_dir/$new_name.$extension"
  done

  find "$source_dir" -type d -name "semi-signed" | while read -r dir_path; do
    cd "$dir_path" || continue
    7z x "*.zip"

    unzipped_content=$(find "$dir_path" -maxdepth 1 -type f -name "*.ipa" -o -name "*.apk")
    file_name=$(basename "$unzipped_content")
    extension="${file_name##*.}"
    new_name="${prefix}"
    
    mv "$unzipped_content" "$destination_dir/$new_name.$extension"
  done

  find "$source_dir" -type d -name "non-wrapped" | while read -r dir_path; do
    cd "$dir_path" || continue
    cd ..
    dir_name=$(basename "$PWD")

    if ["$dir_name" = "android" ]; then

      cd "$dir_path" || continue
      7z x "*apk.zip"
    else
      cd "$dir_path"
      7z x "*.zip"
    fi
    unzipped_content=$(find "$dir_path" -maxdepth 1 -type f -name "*.ipa" -o -name "*.apk")
    file_name=$(basename "$unzipped_content")
    extension="${file_name##*.}"
    new_name="${prefix}_no_root"
    
    mv "$unzipped_content" "$destination_dir/$new_name.$extension"
  done
  echo "All files have been unzipped, renamed, and copied successfully!"
fi