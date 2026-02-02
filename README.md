# Take Home Coding Assessment for Nice Healthcare

## Preview

Run `npm install` to install the packages, and then `npm run preview` to build the site and start the preview server. The app will then be available at http://localhost:4173/.

## Assumptions

I built this to be as lean as possible, considering it’s just a single page with a form and a list of results and contains no server-side elements. A real app would need a little more architectural complexity - server side elements, more complex state management, a more thorough design system, etc.

Given that there are no designs, I tried to base the look & feel off of the https://www.nice.healthcare/ homepage. It is optimized to fit well on a phone and to use a dark mode preference, if the user has one.

In a real environment, this would need to connect to some kind of third party geolocation service to get latitude and longitude coordinates for addresses, as well as actual driving distance calculations. It’s been a long time since I had to research options in this area, but I am assuming that it would be a paid service with pricing based on the number of queries done within a given time period, and that looking up actual drive times (including live traffic data, road closures, etc.) would be more expensive than looking up coordinates.

The instructions say to return the nearest clinician but I opted to list three - the nearest (highlighted) and then two alternatives. There may be situations where the nearest clinician is not the best choice, and I did not think it made sense to withhold information about the next-nearest alternatives when we do have that information. Similarly, if a lab visit is needed I included the name of the lab that the distance calculations are for.

I opted to do an actual distance calculation. The lab and clinician addresses use their actual coordinates, and the entered address is associated with a randomly chosen coordinate pair out of a list of 7. Like the clinician addresses, 6 of them are in the Minneapolis area and one is in the Boulder area. The chosen address is logged to the console, so you can see which coordinates a given form submission is using.

## Taking This from MVP to Production

Right now this app is client-side only with hardcoded data, so the biggest change in getting it production ready would be that it would have to be connected to a real data source for the clinician and lab data, and a real geolocation service to get coordinates and/or driving times for addresses.

This would necessitate adding error and loading states to the form. Right now, the only error possible is if you don’t enter anything in the address field and there are no loading states because the code executes too quickly for them to be seen. In a real environment, we would have to wait for the clinician and lab data to be received from a database or API, and we would (probably) have to wait for the geolocation service to return data as well. All of those come with potential error states if the service is unreachable or it returns an invalid value.

## Limitations

Getting latitude and longitude coordinates from a third party service will be expensive, both in terms of wait time and cost to the company. However, we only need to do this once - the first time we receive an address. Clinician and lab addresses are managed by the company and would not change often; we can fetch the coordinates for an address and store them alongside the address itself. Patient addresses would change more frequently but still might be stored in the system (if this is a returning patient re-using their prior address).

The next limitation would be comparing the patient address to all available clinician addresses, or all available clinician x lab addresses for a lab visit. This works for the MVP version because the data set is limited, but it is not reasonable to do in a situation with hundreds or thousands of clinicians and labs. We need to reduce the number of addresses being compared and/or cache the results.

Since our list of labs and clinicians is fixed, we can pre-calculate and cache the distance between each clinician and each lab, reducing one leg of the calculation when labs are involved. If we do have the patient address stored, we can also cache the lab-patient and lab-clinician distances, meaning we would not have to do any distance calculations at all.

We can also try to reduce the number of clinicians and labs we return for a given patient address. We could limit the list to addresses in the patient’s state and adjoining states, for instance - the nearest address to a given patient may potentially be in another state but it is never going to be two states away. If we have cached distance values as mentioned above, we can opt to only retrieve clinicians and labs from within a max distance. Or we could use min-max latitude & longitude values as a rough filter.

## Other Considerations

Right now we are using a linear distance between points, not driving distance or driving time. While there is some relation between all 3, it is not always going to be true that the nearest linear distance is also the nearest driving distance and the quickest driving time. It is driving time we would want to optimize for, and that is also the most difficult to calculate: it will require an expensive request to a third party service and it cannot be cached, since traffic and road conditions change often. We can limit actual drive time calculations to the closest x clinicians to reduce cost factors, but a decision will still need to be made if the utility is worth the expense.

The app is designed around a single-visit basis, assuming the clinician starts and ends at their home. This may not always be the case - they may coming from another location, or they may want to group several visits before ultimately returning home.

The app is agnostic about which clinicians and labs it considers, but presumably other factors would be in play here to narrow theses lists, things like whether or not the clinician is available to work, whether or not the lab is open or has limits on what types of samples it accepts, whether the patient has a preference for a particular clinician (e.g. someone they have worked with before), where clinicians’ licenses allow them to travel, and probably many other factors I don’t know without knowing the business better.

In particular, probably do prefer to see a clinician they have seen before (and familiarity probably contributes to better care outcomes) so it might be smart for the system to prioritize previously-seen clinicians for repeat patients. If the system defaults to nearest clinician for first visits, repeat visits would also be near visits (unless one of the parties has since changed location) and would be a way to both bypass the location-matching logic altogether and keep clinicians within the same geographic area to minimize drive times.
