package dev.jramde.book_network.enums;

import lombok.Getter;

@Getter
public enum EEmailTemplateName {
    ACTIVATE_ACCOUNT("activate_account");

    // Because we want to use the name as the email template
    private final String name;

    // Constructor
    EEmailTemplateName(String name) {
        this.name = name;
    }
}
