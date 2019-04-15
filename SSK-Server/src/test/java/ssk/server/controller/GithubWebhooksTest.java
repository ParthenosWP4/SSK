package ssk.server.controller;




import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import ssk.server.SSKApplication;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = SSKApplication.class)
@AutoConfigureMockMvc
public class GithubWebhooksTest {
	
	@Autowired
	private GithubWebhooks githubWebhooks;
	
	@Autowired
	private MockMvc mockMvc;
	
	
	@Test
	public void webhooksHandleWithNoPayload() throws Exception {
		this.mockMvc.perform(post("/webhooks/commits")
				                     .contentType(MediaType.APPLICATION_JSON))
				     .andDo(print()).andExpect(status().isBadRequest());
	}
	
	@Test
	public void webhooksHandleWithNoCommitsKeyInPayload() throws Exception {
		String payload = "{\n" +
				                 "    \"ref\": \"refs/heads/master\",\n" +
				                 "    \"before\": \"ad4d583c83a03d78712638bd20e31a6cbd5209d7\",\n" +
				                 "    \"after\": \"a06c1724c06898d776962e0117598af3730c6333\",\n" +
				                 "    \"created\": false,\n" +
				                 "    \"deleted\": false,\n" +
				                 "    \"forced\": false,\n" +
				                 "    \"base_ref\": null,\n" +
				                 "    \"pusher\": {\n" +
				                 "      \"name\": \"charlesriondet\",\n" +
				                 "      \"email\": \"charles.riondet@inria.fr\"\n" +
				                 "    },\n" +
				                 "    \"organization\": {\n" +
				                 "      \"login\": \"ParthenosWP4\",\n" +
				                 "      \"id\": 15829807,\n" +
				                 "      \"node_id\": \"MDEyOk9yZ2FuaXphdGlvbjE1ODI5ODA3\",\n" +
				                 "      \"url\": \"https://api.github.com/orgs/ParthenosWP4\",\n" +
				                 "      \"repos_url\": \"https://api.github.com/orgs/ParthenosWP4/repos\",\n" +
				                 "      \"events_url\": \"https://api.github.com/orgs/ParthenosWP4/events\",\n" +
				                 "      \"hooks_url\": \"https://api.github.com/orgs/ParthenosWP4/hooks\",\n" +
				                 "      \"issues_url\": \"https://api.github.com/orgs/ParthenosWP4/issues\",\n" +
				                 "      \"members_url\": \"https://api.github.com/orgs/ParthenosWP4/members{/member}\",\n" +
				                 "      \"public_members_url\": \"https://api.github.com/orgs/ParthenosWP4/public_members{/member}\",\n" +
				                 "      \"avatar_url\": \"https://avatars3.githubusercontent.com/u/15829807?v=4\",\n" +
				                 "      \"description\": \"\"\n" +
				                 "    },\n" +
				                 "    \"sender\": {\n" +
				                 "      \"login\": \"charlesriondet\",\n" +
				                 "      \"id\": 15829789,\n" +
				                 "      \"node_id\": \"MDQ6VXNlcjE1ODI5Nzg5\",\n" +
				                 "      \"avatar_url\": \"https://avatars2.githubusercontent.com/u/15829789?v=4\",\n" +
				                 "      \"gravatar_id\": \"\",\n" +
				                 "      \"url\": \"https://api.github.com/users/charlesriondet\",\n" +
				                 "      \"html_url\": \"https://github.com/charlesriondet\",\n" +
				                 "      \"followers_url\": \"https://api.github.com/users/charlesriondet/followers\",\n" +
				                 "      \"following_url\": \"https://api.github.com/users/charlesriondet/following{/other_user}\",\n" +
				                 "      \"gists_url\": \"https://api.github.com/users/charlesriondet/gists{/gist_id}\",\n" +
				                 "      \"starred_url\": \"https://api.github.com/users/charlesriondet/starred{/owner}{/repo}\",\n" +
				                 "      \"subscriptions_url\": \"https://api.github.com/users/charlesriondet/subscriptions\",\n" +
				                 "      \"organizations_url\": \"https://api.github.com/users/charlesriondet/orgs\",\n" +
				                 "      \"repos_url\": \"https://api.github.com/users/charlesriondet/repos\",\n" +
				                 "      \"events_url\": \"https://api.github.com/users/charlesriondet/events{/privacy}\",\n" +
				                 "      \"received_events_url\": \"https://api.github.com/users/charlesriondet/received_events\",\n" +
				                 "      \"type\": \"User\",\n" +
				                 "      \"site_admin\": false\n" +
				                 "    }\n" +
				                 "  }";
		this.mockMvc.perform(post("/webhooks/commits")
				                     .contentType(MediaType.APPLICATION_JSON)
				                     .content(payload))
				.andDo(print()).andExpect(status().isBadRequest());
	}
	
	
	@Test
	public void webhooksHandleWithEmptyPayload()throws Exception {
		String payload = "{\n" +
				                 "    \"ref\": \"refs/heads/master\",\n" +
				                 "    \"before\": \"ad4d583c83a03d78712638bd20e31a6cbd5209d7\",\n" +
				                 "    \"after\": \"a06c1724c06898d776962e0117598af3730c6333\",\n" +
				                 "    \"created\": false,\n" +
				                 "    \"deleted\": false,\n" +
				                 "    \"forced\": false,\n" +
				                 "    \"base_ref\": null,\n" +
				                 "    \"compare\": \"https://github.com/ParthenosWP4/SSK/compare/ad4d583c83a0...a06c1724c068\",\n" +
				                 "    \"commits\": [],\n" +
				                 "    \"pusher\": {\n" +
				                 "      \"name\": \"charlesriondet\",\n" +
				                 "      \"email\": \"charles.riondet@inria.fr\"\n" +
				                 "    },\n" +
				                 "    \"organization\": {\n" +
				                 "      \"login\": \"ParthenosWP4\",\n" +
				                 "      \"id\": 15829807,\n" +
				                 "      \"node_id\": \"MDEyOk9yZ2FuaXphdGlvbjE1ODI5ODA3\",\n" +
				                 "      \"url\": \"https://api.github.com/orgs/ParthenosWP4\",\n" +
				                 "      \"repos_url\": \"https://api.github.com/orgs/ParthenosWP4/repos\",\n" +
				                 "      \"events_url\": \"https://api.github.com/orgs/ParthenosWP4/events\",\n" +
				                 "      \"hooks_url\": \"https://api.github.com/orgs/ParthenosWP4/hooks\",\n" +
				                 "      \"issues_url\": \"https://api.github.com/orgs/ParthenosWP4/issues\",\n" +
				                 "      \"members_url\": \"https://api.github.com/orgs/ParthenosWP4/members{/member}\",\n" +
				                 "      \"public_members_url\": \"https://api.github.com/orgs/ParthenosWP4/public_members{/member}\",\n" +
				                 "      \"avatar_url\": \"https://avatars3.githubusercontent.com/u/15829807?v=4\",\n" +
				                 "      \"description\": \"\"\n" +
				                 "    },\n" +
				                 "    \"sender\": {\n" +
				                 "      \"login\": \"charlesriondet\",\n" +
				                 "      \"id\": 15829789,\n" +
				                 "      \"node_id\": \"MDQ6VXNlcjE1ODI5Nzg5\",\n" +
				                 "      \"avatar_url\": \"https://avatars2.githubusercontent.com/u/15829789?v=4\",\n" +
				                 "      \"gravatar_id\": \"\",\n" +
				                 "      \"url\": \"https://api.github.com/users/charlesriondet\",\n" +
				                 "      \"html_url\": \"https://github.com/charlesriondet\",\n" +
				                 "      \"followers_url\": \"https://api.github.com/users/charlesriondet/followers\",\n" +
				                 "      \"following_url\": \"https://api.github.com/users/charlesriondet/following{/other_user}\",\n" +
				                 "      \"gists_url\": \"https://api.github.com/users/charlesriondet/gists{/gist_id}\",\n" +
				                 "      \"starred_url\": \"https://api.github.com/users/charlesriondet/starred{/owner}{/repo}\",\n" +
				                 "      \"subscriptions_url\": \"https://api.github.com/users/charlesriondet/subscriptions\",\n" +
				                 "      \"organizations_url\": \"https://api.github.com/users/charlesriondet/orgs\",\n" +
				                 "      \"repos_url\": \"https://api.github.com/users/charlesriondet/repos\",\n" +
				                 "      \"events_url\": \"https://api.github.com/users/charlesriondet/events{/privacy}\",\n" +
				                 "      \"received_events_url\": \"https://api.github.com/users/charlesriondet/received_events\",\n" +
				                 "      \"type\": \"User\",\n" +
				                 "      \"site_admin\": false\n" +
				                 "    }\n" +
				                 "  }";
		this.mockMvc.perform(post("/webhooks/commits")
				                     .contentType(MediaType.APPLICATION_JSON)
				                     .content(payload))
				    .andDo(print())
				    .andExpect(status().isNotFound())
	                .andExpect(content().string(containsString("COMMITS NOT FOUND")));
	}
	
	
	@Test
	public void webhooksHandleCommitsContainsAddedFiles()throws Exception {
		
			String payload =         "{\n" +
					                 "    \"ref\": \"refs/heads/master\",\n" +
					                 "    \"before\": \"ca71e25185e6ffb53f84911a977eb2a6619c5e82\",\n" +
					                 "    \"after\": \"72e78e22301bf50dcc01293f77ad56da8afe988e\",\n" +
					                 "    \"created\": false,\n" +
					                 "    \"deleted\": false,\n" +
					                 "    \"forced\": false,\n" +
					                 "    \"base_ref\": null,\n" +
					                 "    \"compare\": \"https://github.com/ParthenosWP4/SSK/compare/ca71e25185e6...72e78e22301b\",\n" +
					                 "    \"commits\": [\n" +
					                 "      {\n" +
					                 "        \"id\": \"72e78e22301bf50dcc01293f77ad56da8afe988e\",\n" +
					                 "        \"tree_id\": \"2e20bce2eaaccaf87da9c80fbc33758ca352e917\",\n" +
					                 "        \"distinct\": true,\n" +
					                 "        \"message\": \"update some scenarios\",\n" +
					                 "        \"timestamp\": \"2019-02-22T15:43:15+01:00\",\n" +
					                 "        \"url\": \"https://github.com/ParthenosWP4/SSK/commit/72e78e22301bf50dcc01293f77ad56da8afe988e\",\n" +
					                 "        \"author\": {\n" +
					                 "          \"name\": \"charlesriondet\",\n" +
					                 "          \"email\": \"charles.riondet@inria.fr\",\n" +
					                 "          \"username\": \"charlesriondet\"\n" +
					                 "        },\n" +
					                 "        \"committer\": {\n" +
					                 "          \"name\": \"charlesriondet\",\n" +
					                 "          \"email\": \"charles.riondet@inria.fr\",\n" +
					                 "          \"username\": \"charlesriondet\"\n" +
					                 "        },\n" +
					                 "        \"added\": [\n" +
					                 "          \"scenarios/SSK_sc_corpusModellingInTEI.xml\"\n" +
					                 "        ]\n" +
					                 "      }\n" +
					                 "    ]\n" +
					                 "  }";
	
	}
	
}
