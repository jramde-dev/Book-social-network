package dev.jramde.book_network.file;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

/**
 * @author : Juldas RAMDE, ramde266@gmail.com.
 * @since : 16/10/2025, 03:13
 */

@Slf4j
public class AppFileUtils {

    public static byte[] readFileFromLocation(String fileUrl) {
        if (StringUtils.isBlank(fileUrl)) {
            return null;
        }

        try {
            Path filePath = new File(fileUrl).toPath();
            return Files.readAllBytes(filePath);
        } catch (IOException e) {
            log.warn("No file found in the path {}", fileUrl);
            return null;
        }
    }
}
