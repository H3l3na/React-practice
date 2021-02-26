package org.app;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import io.quarkus.test.junit.QuarkusTest;
import javax.inject.Inject;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.is;

@QuarkusTest
public class EntityQuarkusTest {

    @Inject EntityTestExecutor entityTestExecutor;

    @Test
    public void testAllEntities() {
        /*Exception exception =
                assertThrows(
                        RuntimeException.class,
                        () -> {
                            entityTestExecutor.executeTests();
                        });

        String expectedMessage = "Finished";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.equals(expectedMessage), actualMessage);*/
        entityTestExecutor.executeTests();
    }
}